import type { APIRoute } from 'astro';

/**
 * POST /api/lead — generic lead endpoint for client sites.
 *
 * Not a route in the portfolio (src/templates is not src/pages); the scaffold
 * copies this file to the client's `src/pages/api/lead.ts`. Used by
 * LeadForm.astro when `contact.form.provider` is `resend` or `webhook`.
 *
 * Env (Vercel project settings or local `.env`):
 *   LEAD_WEBHOOK_URL  optional — when set, the lead is POSTed as JSON here
 *                     (Make, n8n, Zapier, Google Apps Script…) and no e-mail is sent
 *   RESEND_API_KEY    required otherwise — https://resend.com/api-keys
 *   LEAD_TO           inbox that receives the leads (comma-separated allowed)
 *   LEAD_FROM         Resend-verified sender, e.g. 'Site <leads@cliente.com.br>'
 *   SITE_NAME         subject prefix (defaults to 'Site')
 *
 * Body: JSON with `name` (required), `phone` and/or `email` (one required),
 * `message` (optional, ≤ 5000 chars), `source`, honeypot `hp`, plus any extra
 * string fields (≤ 200 chars each, rendered as a table).
 *
 * Responses are always `application/json`, `Cache-Control: no-store`, shaped
 * `{ ok: boolean, code?: string }`. User input is never echoed back.
 */

export const prerender = false;

const MAX_BODY_BYTES = 16 * 1024;
const MAX_EXTRA_FIELDS = 20;
const MAX_EXTRA_LEN = 200;
const LOCAL_HOSTS = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const RATE_MAP_CAP = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\- ()]*$/;
const KEY_RE = /^[a-zA-Z][a-zA-Z0-9_-]{0,39}$/;
const CORE_FIELDS = new Set(['name', 'phone', 'email', 'message']);
const META_FIELDS = new Set(['hp', 'source', 'access_key']);

/* ----------------------------------------------------------------------------
 * Env — read statically (Astro replaces `import.meta.env.X` in SSR builds);
 * `process.env` covers variables set only on the host at runtime.
 * -------------------------------------------------------------------------- */
function pick(name: string, meta: unknown): string {
	if (typeof meta === 'string' && meta.trim()) return meta.trim();
	const v = typeof process !== 'undefined' ? process.env[name] : undefined;
	return typeof v === 'string' ? v.trim() : '';
}

function getEnv() {
	return {
		webhook: pick('LEAD_WEBHOOK_URL', import.meta.env.LEAD_WEBHOOK_URL),
		resendKey: pick('RESEND_API_KEY', import.meta.env.RESEND_API_KEY),
		to: pick('LEAD_TO', import.meta.env.LEAD_TO),
		from: pick('LEAD_FROM', import.meta.env.LEAD_FROM),
		siteName: pick('SITE_NAME', import.meta.env.SITE_NAME) || 'Site',
	};
}

/* ----------------------------------------------------------------------------
 * Best-effort rate limit (per serverless instance).
 * -------------------------------------------------------------------------- */
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now = Date.now()): number | null {
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
	if (recent.length >= RATE_MAX) {
		hits.set(ip, recent);
		return Math.max(1, Math.ceil((recent[0]! + RATE_WINDOW_MS - now) / 1000));
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
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Header-safe: no CR/LF, collapsed whitespace. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** `first_name` → `First name` */
const labelOf = (key: string) => {
	const words = key.replace(/[_-]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
	return words.charAt(0).toUpperCase() + words.slice(1);
};

function clientIp(request: Request): string {
	const xff = request.headers.get('x-forwarded-for') ?? '';
	const first = xff.split(',')[0]?.trim();
	return first || request.headers.get('x-real-ip') || 'unknown';
}

function originAllowed(request: Request): boolean {
	if (request.headers.get('sec-fetch-site') === 'same-origin') return true;
	const origin = request.headers.get('origin');
	if (!origin) return false;
	let host: string;
	try {
		host = new URL(origin).host;
	} catch {
		return false;
	}
	if (host === new URL(request.url).host) return true;
	if (import.meta.env.DEV && LOCAL_HOSTS.test(host)) return true;
	return false;
}

/* ----------------------------------------------------------------------------
 * Payload
 * -------------------------------------------------------------------------- */
interface Lead {
	name: string;
	phone: string;
	email: string;
	message: string;
	source: string;
	extras: Array<[string, string]>;
}

function parseLead(raw: unknown): Lead | null {
	if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
	const b = raw as Record<string, unknown>;

	const name = oneLine(str(b.name, 121));
	const phone = oneLine(str(b.phone, 31));
	const email = oneLine(str(b.email, 255));
	const message = str(b.message, 5001);
	const source = oneLine(str(b.source, 81));

	if (name.length < 2 || name.length > 120) return null;
	if (email && (email.length > 254 || !EMAIL_RE.test(email))) return null;
	if (phone && (phone.length > 30 || !PHONE_RE.test(phone))) return null;
	if (!email && !phone) return null;
	if (message.length > 5000) return null;

	const extras: Array<[string, string]> = [];
	for (const [key, value] of Object.entries(b)) {
		if (CORE_FIELDS.has(key) || META_FIELDS.has(key)) continue;
		if (typeof value !== 'string') continue;
		if (!KEY_RE.test(key) || value.length > MAX_EXTRA_LEN) return null;
		const v = oneLine(value);
		if (v) extras.push([labelOf(key), v]);
		if (extras.length > MAX_EXTRA_FIELDS) return null;
	}

	return { name, phone, email, message, source, extras };
}

/* ----------------------------------------------------------------------------
 * Delivery
 * -------------------------------------------------------------------------- */
function buildEmail(lead: Lead, siteName: string, meta: { ip: string; ua: string }) {
	const subject = oneLine(`[${siteName}] Novo lead — ${lead.name}`.replace(/[<>]/g, ''));

	const rows: Array<[string, string]> = (
		[
			['Nome', lead.name],
			['Telefone', lead.phone],
			['E-mail', lead.email],
			...lead.extras,
			['Origem', lead.source],
		] as Array<[string, string]>
	).filter(([, v]) => v);

	const metaRows: Array<[string, string]> = [
		['Recebido', new Date().toISOString()],
		['IP', meta.ip],
		['Navegador', meta.ua],
	].filter(([, v]) => v) as Array<[string, string]>;

	const tr = ([k, v]: [string, string]) =>
		`<tr><td style="padding:4px 12px 4px 0;color:#6e6e74;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`;

	const html = `<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.5;color:#1a1a1c;max-width:640px">
	<p style="margin:0 0 12px;font-family:ui-monospace,monospace;font-size:12px;color:#6e6e74">${escapeHtml(subject)}</p>
	<table style="border-collapse:collapse;font-size:14px;margin:0 0 20px">${rows.map(tr).join('')}</table>
	${lead.message ? `<p style="white-space:pre-wrap;margin:0 0 24px;font-size:15px">${escapeHtml(lead.message)}</p>` : ''}
	<hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
	<table style="border-collapse:collapse;font-family:ui-monospace,monospace;font-size:12px;color:#6e6e74">${metaRows.map(tr).join('')}</table>
</div>`;

	const text = [...rows.map(([k, v]) => `${k}: ${v}`), '', lead.message, '', '---', ...metaRows.map(([k, v]) => `${k}: ${v}`)].join('\n');

	return { subject, html, text };
}

async function sendResend(lead: Lead, env: ReturnType<typeof getEnv>, meta: { ip: string; ua: string }): Promise<boolean> {
	const { subject, html, text } = buildEmail(lead, env.siteName, meta);
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: { authorization: `Bearer ${env.resendKey}`, 'content-type': 'application/json' },
		body: JSON.stringify({
			from: env.from,
			to: env.to.split(',').map((s) => s.trim()).filter(Boolean),
			...(lead.email ? { reply_to: lead.email } : {}),
			subject,
			html,
			text,
		}),
	});
	if (!res.ok) {
		console.error('[lead] resend', res.status, (await res.text()).slice(0, 300));
		return false;
	}
	return true;
}

async function sendWebhook(lead: Lead, env: ReturnType<typeof getEnv>, meta: { ip: string; ua: string }): Promise<boolean> {
	const res = await fetch(env.webhook, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({
			site: env.siteName,
			name: lead.name,
			phone: lead.phone,
			email: lead.email,
			message: lead.message,
			source: lead.source,
			extras: Object.fromEntries(lead.extras),
			receivedAt: new Date().toISOString(),
			ip: meta.ip,
			userAgent: meta.ua,
		}),
	});
	if (!res.ok) {
		console.error('[lead] webhook', res.status);
		return false;
	}
	return true;
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

		const lead = parseLead(raw);
		if (!lead) return json(400, { ok: false, code: 'INVALID' });

		const env = getEnv();
		const provider = env.webhook ? 'webhook' : 'resend';
		if (provider === 'resend' && !(env.resendKey && env.to && env.from)) {
			console.error('[lead] not configured: set LEAD_WEBHOOK_URL or RESEND_API_KEY + LEAD_TO + LEAD_FROM');
			return json(500, { ok: false, code: 'NOT_CONFIGURED' });
		}

		const meta = { ip, ua: (request.headers.get('user-agent') ?? '').slice(0, 160) };
		const sent = provider === 'webhook' ? await sendWebhook(lead, env, meta) : await sendResend(lead, env, meta);
		if (!sent) return json(502, { ok: false, code: 'SEND_FAILED' });
		return json(200, { ok: true });
	} catch (err) {
		console.error('[lead] unexpected', err instanceof Error ? { name: err.name, message: err.message } : err);
		return json(500, { ok: false, code: 'UNEXPECTED' });
	}
};
