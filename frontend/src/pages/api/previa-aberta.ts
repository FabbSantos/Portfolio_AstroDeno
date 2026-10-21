import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { RESEND_API_KEY, CONTACT_TO } from 'astro:env/server';
import { SITE } from '../../data/site';
import { previas } from '../../data/previas';
import { clientIp, json, originAllowed } from './_http';

/**
 * POST /api/previa-aberta: a client preview (/previas/<slug>) tells the owner
 * that someone opened it, or tapped its WhatsApp button, by e-mail (Resend),
 * so he can follow up while the prospect is looking.
 *
 * Body: { slug, event: 'open' | 'whatsapp', ref?: referrer host, path?: path + query }.
 * The e-mail says when (São Paulo time), roughly where (Vercel's IP geo
 * headers: city, state, country), on what (phone or computer, browser or
 * in-app browser) and where the visit came from. Nothing is stored.
 *
 * The page pings once per browser session and never from the owner's own
 * browsers (opened once with ?eu=1); here, the same IP + preview + event is
 * mailed at most once per 30 minutes (per warm instance).
 */

export const prerender = false;

const FROM = 'Prévias · fabbahiense.dev <noreply@fabbahiense.dev>';
const EVENTS = { open: 'abriu a prévia', whatsapp: 'tocou no WhatsApp da prévia' } as const;
type Event = keyof typeof EVENTS;
const WINDOW_MS = 30 * 60 * 1000;
const seen = new Map<string, number>();

/** Browser or in-app browser, in order: in-app browsers first, since they say where the link was opened. */
const APPS: [RegExp, string][] = [
	[/Instagram/i, 'Instagram (app)'],
	[/FBAN|FBAV|FB_IAB/i, 'Facebook (app)'],
	[/WhatsApp/i, 'WhatsApp (app)'],
	[/EdgA?\//, 'Edge'],
	[/SamsungBrowser/, 'Samsung Internet'],
	[/CriOS|Chrome\//, 'Chrome'],
	[/FxiOS|Firefox\//, 'Firefox'],
	[/Safari\//, 'Safari'],
];

/** "celular · Instagram (app)" from a user agent. */
export function describeAgent(ua: string): string {
	const device = /iPad|Tablet/i.test(ua) ? 'tablet' : /Mobi|Android|iPhone/i.test(ua) ? 'celular' : 'computador';
	const app = APPS.find(([re]) => re.test(ua))?.[1] ?? 'navegador desconhecido';
	return `${device} · ${app}`;
}

/** "Rio de Janeiro, RJ, BR" from Vercel's geo headers (absent locally). */
export function describePlace(headers: Headers): string {
	const city = headers.get('x-vercel-ip-city');
	const parts = [city ? decodeURIComponent(city) : '', headers.get('x-vercel-ip-country-region') ?? '', headers.get('x-vercel-ip-country') ?? ''].filter(Boolean);
	return parts.length ? parts.join(', ') : 'não informado';
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max).replace(/[\r\n]+/g, ' ').trim() : '');

export const ALL: APIRoute = () => json(405, { ok: false, code: 'METHOD_NOT_ALLOWED' }, { allow: 'POST' });

export const POST: APIRoute = async ({ request }) => {
	if (!/^application\/json\b/i.test(request.headers.get('content-type') ?? '')) return json(415, { ok: false, code: 'UNSUPPORTED_MEDIA_TYPE' });
	if (!originAllowed(request)) return json(403, { ok: false, code: 'FORBIDDEN' });

	let raw: Record<string, unknown>;
	try {
		raw = (await request.json()) as Record<string, unknown>;
	} catch {
		return json(400, { ok: false, code: 'INVALID' });
	}
	const previa = previas.find((p) => p.slug === raw.slug);
	const event = raw.event as Event;
	if (!previa || !(event in EVENTS)) return json(400, { ok: false, code: 'INVALID' });

	const ip = clientIp(request);
	const key = `${ip}|${previa.slug}|${event}`;
	const now = Date.now();
	const last = seen.get(key);
	if (last && now - last < WINDOW_MS) return json(200, { ok: true, code: 'ALREADY_SENT' });
	seen.set(key, now);
	if (seen.size > 2000) for (const [k, t] of seen) if (now - t >= WINDOW_MS) seen.delete(k);

	if (!RESEND_API_KEY) {
		console.error('[previa-aberta] not configured: RESEND_API_KEY is missing');
		return json(500, { ok: false, code: 'NOT_CONFIGURED' });
	}

	const when = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'short', timeStyle: 'short' }).format(now);
	const ref = str(raw.ref, 120) || 'direto (link colado ou digitado)';
	const path = str(raw.path, 200) || `/previas/${previa.slug}`;
	const link = new URL(path, SITE.url).href;
	const lines = [
		`Alguém ${EVENTS[event]} da ${previa.name}.`,
		'',
		`Quando: ${when} (horário de Brasília)`,
		`Onde: ${describePlace(request.headers)}`,
		`Aparelho: ${describeAgent(request.headers.get('user-agent') ?? '')}`,
		`Veio de: ${ref}`,
		`Link: ${link}`,
	];

	try {
		const resend = new Resend(RESEND_API_KEY);
		const { error } = await resend.emails.send({
			from: FROM,
			to: CONTACT_TO || SITE.leadInbox,
			subject: `[Prévia] ${previa.name}: ${EVENTS[event]}`,
			text: lines.join('\n'),
		});
		if (error) {
			console.error('[previa-aberta] resend', error);
			seen.delete(key);
			return json(502, { ok: false, code: 'SEND_FAILED' });
		}
	} catch (err) {
		console.error('[previa-aberta]', err instanceof Error ? err.message : err);
		seen.delete(key);
		return json(500, { ok: false, code: 'UNEXPECTED' });
	}
	return json(200, { ok: true });
};
