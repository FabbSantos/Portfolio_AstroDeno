import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { RESEND_API_KEY, CONTACT_TO, TURNSTILE_SECRET_KEY } from 'astro:env/server';
import { SITE } from '../../data/site';
import { SERVICES } from '../../data/services';
import { fullName, templates } from '../../data/templates';

/**
 * POST /api/contact — receives the JSON payload from home Contact.astro,
 * validates it and forwards the lead via Resend to the inbox.
 *
 * Env (astro.config `env.schema`, set in Vercel + local `.env`):
 *   RESEND_API_KEY        required — https://resend.com/api-keys
 *   CONTACT_TO            optional — defaults to SITE.leadInbox
 *   TURNSTILE_SECRET_KEY  optional — enables Cloudflare Turnstile verification
 *
 * Responses are always `application/json`, `Cache-Control: no-store`, shaped
 * `{ ok: boolean, code?: string }`. User input is never echoed back.
 */

export const prerender = false;

// Sending direct to Gmail bypasses name.com's anti-spoofing on the forwarding
// service (it rejects `noreply@fabbahiense.dev` → `contato@fabbahiense.dev`).
// `FROM` must be a Resend-verified sender.
const FROM = 'Portfolio · fabbahiense.dev <noreply@fabbahiense.dev>';

const MAX_BODY_BYTES = 16 * 1024;
const ALLOWED_HOSTS = new Set(['www.fabbahiense.dev', 'fabbahiense.dev']);
const LOCAL_HOSTS = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const RATE_MAP_CAP = 5000;

const TEMPLATE_SLUGS = templates.map((t) => t.slug);
const NEEDS = new Set<string>([...SERVICES.map((s) => s.id), ...TEMPLATE_SLUGS, 'template', 'acesso-pulsar', 'acesso-quasar', 'other']);
const DEADLINES = new Set(['week', 'month', 'quarter', 'flexible']);
const LOCALES = new Set(['pt', 'en']);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_RE = /^[0-9+\- ()]*$/;

/* ----------------------------------------------------------------------------
 * Best-effort rate limit. Serverless instances do NOT share memory, so this is
 * per-instance only — it still stops naive loops hammering a warm function.
 * -------------------------------------------------------------------------- */
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now = Date.now()): number | null {
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
	if (recent.length >= RATE_MAX) {
		hits.set(ip, recent);
		const retryMs = recent[0]! + RATE_WINDOW_MS - now;
		return Math.max(1, Math.ceil(retryMs / 1000));
	}
	recent.push(now);
	hits.set(ip, recent);
	if (hits.size > RATE_MAP_CAP) {
		for (const [k, ts] of hits) {
			if (ts.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
			if (hits.size <= RATE_MAP_CAP / 2) break;
		}
	}
	return null;
}

/* ----------------------------------------------------------------------------
 * Helpers
 * -------------------------------------------------------------------------- */
function json(status: number, body: { ok: boolean; code?: string }, extra: Record<string, string> = {}): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...extra },
	});
}

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/** Header-safe: no CR/LF, collapsed whitespace. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function clientIp(request: Request): string {
	const xff = request.headers.get('x-forwarded-for') ?? '';
	const first = xff.split(',')[0]?.trim();
	return first || request.headers.get('x-real-ip') || 'unknown';
}

function originAllowed(request: Request): boolean {
	const site = request.headers.get('sec-fetch-site');
	if (site === 'same-origin') return true;
	const origin = request.headers.get('origin');
	if (!origin) return false;
	let host: string;
	try {
		host = new URL(origin).host;
	} catch {
		return false;
	}
	if (ALLOWED_HOSTS.has(host)) return true;
	// Browsers set Origin themselves, so matching the request host is a real
	// same-origin check (also covers Vercel preview deployments).
	if (host === new URL(request.url).host) return true;
	if (import.meta.env.DEV && LOCAL_HOSTS.test(host)) return true;
	return false;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
	if (!TURNSTILE_SECRET_KEY) return true;
	try {
		const body = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token });
		if (ip && ip !== 'unknown') body.set('remoteip', ip);
		const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			body,
		});
		const data = (await res.json()) as { success?: boolean };
		return data.success === true;
	} catch (err) {
		console.error('[contact] turnstile', err instanceof Error ? err.message : err);
		return false;
	}
}

/** Subject label — always PT (the inbox is Fabrício's). */
function needLabel(need: string, template: string): string {
	const service = SERVICES.find((s) => s.id === need);
	if (service) return service.name.pt;
	const tpl = templates.find((t) => t.slug === need);
	if (tpl) return `Template ${fullName(tpl)}`;
	switch (need) {
		case 'template':
			return template ? `Template ${template}` : 'Template';
		case 'acesso-pulsar':
			return 'Acesso ao Pulsar';
		case 'acesso-quasar':
			return 'Acesso ao Quasar';
		default:
			return 'Outro assunto';
	}
}

const DEADLINE_LABEL: Record<string, string> = {
	week: 'essa semana',
	month: 'até 30 dias',
	quarter: '1–3 meses',
	flexible: 'sem pressa',
};

/* ----------------------------------------------------------------------------
 * Payload
 * -------------------------------------------------------------------------- */
interface Lead {
	name: string;
	email: string;
	message: string;
	need: string;
	whatsapp: string;
	company: string;
	deadline: string;
	template: string;
	page: string;
	ref: string;
	utm: { source: string; medium: string; campaign: string };
	locale: string;
}

type Parsed = { ok: true; lead: Lead; hp: string; turnstileToken: string } | { ok: false };

function parseLead(raw: unknown): Parsed {
	if (!raw || typeof raw !== 'object') return { ok: false };
	const b = raw as Record<string, unknown>;

	const name = oneLine(str(b.name, 121));
	const email = oneLine(str(b.email, 255));
	const message = str(b.message, 5001);
	const need = str(b.need, 40);
	const whatsapp = str(b.whatsapp, 31);
	const company = oneLine(str(b.company, 121));
	const deadline = str(b.deadline, 20);
	const locale = str(b.locale, 5);
	const templateRaw = str(b.template, 40);

	if (!name || name.length > 120) return { ok: false };
	if (!email || email.length > 254 || !EMAIL_RE.test(email)) return { ok: false };
	if (message.length < 10 || message.length > 5000) return { ok: false };
	if (!NEEDS.has(need)) return { ok: false };
	if (whatsapp.length > 30 || !WHATSAPP_RE.test(whatsapp)) return { ok: false };
	if (company.length > 120) return { ok: false };
	if (deadline && !DEADLINES.has(deadline)) return { ok: false };
	if (!LOCALES.has(locale)) return { ok: false };

	const utmRaw = b.utm && typeof b.utm === 'object' ? (b.utm as Record<string, unknown>) : {};

	return {
		ok: true,
		hp: str(b.hp, 50),
		turnstileToken: str(b.turnstileToken, 4096),
		lead: {
			name,
			email,
			message,
			need,
			whatsapp,
			company,
			deadline,
			template: TEMPLATE_SLUGS.includes(templateRaw) ? templateRaw : '',
			// Metadata is truncated rather than rejected — it is never typed by the user.
			page: oneLine(str(b.page, 300)),
			ref: oneLine(str(b.ref, 300)),
			utm: {
				source: oneLine(str(utmRaw.source, 100)),
				medium: oneLine(str(utmRaw.medium, 100)),
				campaign: oneLine(str(utmRaw.campaign, 100)),
			},
			locale,
		},
	};
}

/* ----------------------------------------------------------------------------
 * Email
 * -------------------------------------------------------------------------- */
function buildEmail(lead: Lead, meta: { ip: string; ua: string }) {
	const label = needLabel(lead.need, lead.template);
	let subject = `[Site] ${label} — ${lead.name}`;
	if (lead.template && lead.need !== lead.template) subject += ` · template ${lead.template}`;
	// Header-safe: single line, no angle brackets (they read as an address in some clients).
	subject = oneLine(subject.replace(/[<>]/g, ''));

	const rows: Array<[string, string]> = [
		['Nome', lead.name],
		['Email', lead.email],
		['WhatsApp', lead.whatsapp],
		['Empresa', lead.company],
		['Precisa de', `${label} (${lead.need})`],
		['Prazo', lead.deadline ? (DEADLINE_LABEL[lead.deadline] ?? lead.deadline) : ''],
		['Template', lead.template],
	].filter(([, v]) => v) as Array<[string, string]>;

	const metaRows: Array<[string, string]> = [
		['Página', lead.page],
		['Referrer', lead.ref],
		['UTM', [lead.utm.source, lead.utm.medium, lead.utm.campaign].filter(Boolean).join(' / ')],
		['Idioma', lead.locale],
		['IP', meta.ip],
		['Navegador', meta.ua],
	].filter(([, v]) => v) as Array<[string, string]>;

	const tr = ([k, v]: [string, string]) =>
		`<tr><td style="padding:4px 12px 4px 0;color:#6e6e74;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`;

	const html = `<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.5;color:#1a1a1c;max-width:640px">
	<p style="margin:0 0 12px;font-family:ui-monospace,monospace;font-size:12px;color:#6e6e74">// ${escapeHtml(subject)}</p>
	<table style="border-collapse:collapse;font-size:14px;margin:0 0 20px">${rows.map(tr).join('')}</table>
	<p style="white-space:pre-wrap;margin:0 0 24px;font-size:15px">${escapeHtml(lead.message)}</p>
	<hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
	<table style="border-collapse:collapse;font-family:ui-monospace,monospace;font-size:12px;color:#6e6e74">${metaRows.map(tr).join('')}</table>
</div>`;

	const text = [
		...rows.map(([k, v]) => `${k}: ${v}`),
		'',
		lead.message,
		'',
		'---',
		...metaRows.map(([k, v]) => `${k}: ${v}`),
	].join('\n');

	return { subject, html, text };
}

/* ----------------------------------------------------------------------------
 * Handlers
 * -------------------------------------------------------------------------- */
export const ALL: APIRoute = () => json(405, { ok: false, code: 'METHOD_NOT_ALLOWED' }, { allow: 'POST' });

export const POST: APIRoute = async ({ request }) => {
	try {
		const ct = request.headers.get('content-type') ?? '';
		if (!/^application\/json\b/i.test(ct)) return json(415, { ok: false, code: 'UNSUPPORTED_MEDIA_TYPE' });

		const declared = Number(request.headers.get('content-length') ?? 0);
		if (declared > MAX_BODY_BYTES) return json(413, { ok: false, code: 'TOO_LARGE' });

		if (!originAllowed(request)) return json(403, { ok: false, code: 'FORBIDDEN' });

		const ip = clientIp(request);
		const retry = rateLimited(ip);
		if (retry !== null) return json(429, { ok: false, code: 'RATE_LIMITED' }, { 'retry-after': String(retry) });

		const bodyText = await request.text();
		if (bodyText.length > MAX_BODY_BYTES) return json(413, { ok: false, code: 'TOO_LARGE' });

		let raw: unknown;
		try {
			raw = JSON.parse(bodyText);
		} catch {
			return json(400, { ok: false, code: 'INVALID' });
		}

		// Honeypot: bots fill every field. Pretend it worked, send nothing.
		if (raw && typeof raw === 'object' && str((raw as Record<string, unknown>).hp, 50)) {
			return json(200, { ok: true });
		}

		const parsed = parseLead(raw);
		if (!parsed.ok) return json(400, { ok: false, code: 'INVALID' });
		const { lead, turnstileToken } = parsed;

		if (TURNSTILE_SECRET_KEY && turnstileToken) {
			const human = await verifyTurnstile(turnstileToken, ip);
			if (!human) return json(400, { ok: false, code: 'BOT' });
		}

		if (!RESEND_API_KEY) {
			console.error('[contact] not configured: RESEND_API_KEY is missing');
			return json(500, { ok: false, code: 'NOT_CONFIGURED' });
		}

		const ua = (request.headers.get('user-agent') ?? '').slice(0, 160);
		const { subject, html, text } = buildEmail(lead, { ip, ua });

		const resend = new Resend(RESEND_API_KEY);
		const { error } = await resend.emails.send({
			from: FROM,
			to: CONTACT_TO || SITE.leadInbox,
			replyTo: lead.email,
			subject,
			html,
			text,
		});
		if (error) {
			console.error('[contact] resend', { name: error.name, message: error.message });
			return json(502, { ok: false, code: 'SEND_FAILED' });
		}
		return json(200, { ok: true });
	} catch (err) {
		console.error('[contact] unexpected', err instanceof Error ? { name: err.name, message: err.message } : err);
		return json(500, { ok: false, code: 'UNEXPECTED' });
	}
};
