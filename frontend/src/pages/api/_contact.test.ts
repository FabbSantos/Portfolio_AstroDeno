/**
 * Unit tests for POST /api/contact.
 * File is underscore-prefixed so Astro's router ignores it (everything else
 * under src/pages becomes a route).
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

const sendMock = vi.hoisted(() => vi.fn());

vi.mock('resend', () => ({
	Resend: class {
		emails = { send: sendMock };
	},
}));

vi.mock('astro:env/server', () => ({
	RESEND_API_KEY: 'test',
	CONTACT_TO: 'x@y.z',
	TURNSTILE_SECRET_KEY: undefined,
}));

import { ALL, POST } from './contact';

const API = 'https://www.fabbahiense.dev/api/contact';
const ORIGIN = 'https://www.fabbahiense.dev';

/** Unique IP per request so the module-level rate limiter doesn't leak between tests. */
let ipSeq = 0;
const freshIp = () => `10.${Math.floor(ipSeq / 65536) % 256}.${Math.floor(ipSeq / 256) % 256}.${++ipSeq % 256}`;

interface ReqInit {
	method?: string;
	headers?: Record<string, string>;
	ip?: string;
	raw?: string;
}

function req(body: unknown, init: ReqInit = {}): Request {
	const headers = new Headers({
		'content-type': 'application/json',
		origin: ORIGIN,
		'x-forwarded-for': init.ip ?? freshIp(),
		'user-agent': 'vitest',
		...init.headers,
	});
	const method = init.method ?? 'POST';
	return new Request(API, {
		method,
		headers,
		body: method === 'GET' || method === 'HEAD' ? undefined : (init.raw ?? JSON.stringify(body)),
	});
}

type Ctx = Parameters<typeof POST>[0];
const call = (handler: typeof POST, request: Request) => handler({ request } as unknown as Ctx);

const lead = () => ({
	name: 'Ana Souza',
	email: 'ana@example.com',
	message: 'Preciso de uma landing page pra um lançamento em setembro.',
	need: 'landing',
	locale: 'pt',
	hp: '',
});

async function bodyOf(res: Response): Promise<{ ok: boolean; code?: string }> {
	return (await res.json()) as { ok: boolean; code?: string };
}

beforeEach(() => {
	sendMock.mockReset();
	sendMock.mockResolvedValue({ data: { id: 'email_1' }, error: null });
});

describe('POST /api/contact', () => {
	it('405 on GET via ALL, with Allow: POST', async () => {
		const res = await call(ALL, req(null, { method: 'GET' }));
		expect(res.status).toBe(405);
		expect(res.headers.get('allow')).toBe('POST');
		expect(res.headers.get('cache-control')).toBe('no-store');
		expect((await bodyOf(res)).ok).toBe(false);
	});

	it('415 on wrong content-type', async () => {
		const res = await call(POST, req(lead(), { headers: { 'content-type': 'text/plain' } }));
		expect(res.status).toBe(415);
		expect(res.headers.get('content-type')).toBe('application/json');
		expect(sendMock).not.toHaveBeenCalled();
	});

	it('413 when content-length exceeds 16 KB', async () => {
		const res = await call(POST, req(lead(), { headers: { 'content-length': String(20 * 1024) } }));
		expect(res.status).toBe(413);
	});

	it('400 on invalid JSON', async () => {
		const res = await call(POST, req(null, { raw: '{not json' }));
		expect(res.status).toBe(400);
		expect((await bodyOf(res)).code).toBe('INVALID');
	});

	it('400 on missing fields', async () => {
		const res = await call(POST, req({ name: 'Ana', locale: 'pt' }));
		expect(res.status).toBe(400);
		expect(await bodyOf(res)).toEqual({ ok: false, code: 'INVALID' });
		expect(sendMock).not.toHaveBeenCalled();
	});

	it('400 on bad email', async () => {
		const res = await call(POST, req({ ...lead(), email: 'not-an-email' }));
		expect(res.status).toBe(400);
		expect((await bodyOf(res)).code).toBe('INVALID');
	});

	it('400 on message > 5000 chars', async () => {
		const res = await call(POST, req({ ...lead(), message: 'x'.repeat(5001) }));
		expect(res.status).toBe(400);
	});

	it('400 on unknown need / deadline / locale', async () => {
		expect((await call(POST, req({ ...lead(), need: 'hack' }))).status).toBe(400);
		expect((await call(POST, req({ ...lead(), deadline: 'yesterday' }))).status).toBe(400);
		expect((await call(POST, req({ ...lead(), locale: 'fr' }))).status).toBe(400);
	});

	it('200 silently when the honeypot is filled (nothing sent)', async () => {
		const res = await call(POST, req({ ...lead(), hp: 'http://spam.example' }));
		expect(res.status).toBe(200);
		expect(await bodyOf(res)).toEqual({ ok: true });
		expect(sendMock).not.toHaveBeenCalled();
	});

	it('403 on foreign origin', async () => {
		const res = await call(POST, req(lead(), { headers: { origin: 'https://evil.example' } }));
		expect(res.status).toBe(403);
		expect(sendMock).not.toHaveBeenCalled();
	});

	it('403 when neither Origin nor Sec-Fetch-Site is present', async () => {
		const request = req(lead());
		request.headers.delete('origin');
		const res = await call(POST, request);
		expect(res.status).toBe(403);
	});

	it('allows Sec-Fetch-Site: same-origin without an Origin header', async () => {
		const request = req(lead(), { headers: { 'sec-fetch-site': 'same-origin' } });
		request.headers.delete('origin');
		const res = await call(POST, request);
		expect(res.status).toBe(200);
	});

	it('429 after 5 posts from the same IP, with Retry-After', async () => {
		const ip = '203.0.113.7';
		for (let i = 0; i < 5; i++) {
			const res = await call(POST, req(lead(), { ip }));
			expect(res.status).toBe(200);
		}
		const res = await call(POST, req(lead(), { ip }));
		expect(res.status).toBe(429);
		expect(await bodyOf(res)).toEqual({ ok: false, code: 'RATE_LIMITED' });
		expect(Number(res.headers.get('retry-after'))).toBeGreaterThan(0);
		expect(sendMock).toHaveBeenCalledTimes(5);
	});

	it('200 happy path: sends once, escaped, never echoes input', async () => {
		const payload = {
			...lead(),
			name: '<b>x</b>',
			company: 'Acme "Ltda"',
			whatsapp: '+55 21 99999-8888',
			deadline: 'month',
			template: 'mirante',
			page: '/templates/mirante',
			ref: 'https://google.com/',
			utm: { source: 'ig', medium: 'bio', campaign: 'ago' },
		};
		const res = await call(POST, req(payload));
		expect(res.status).toBe(200);
		expect(await bodyOf(res)).toEqual({ ok: true });

		expect(sendMock).toHaveBeenCalledTimes(1);
		const arg = sendMock.mock.calls[0]![0] as {
			from: string;
			to: string;
			replyTo: string;
			subject: string;
			html: string;
			text: string;
		};
		expect(arg.to).toBe('x@y.z');
		expect(arg.replyTo).toBe('ana@example.com');
		expect(arg.from).toContain('noreply@fabbahiense.dev');

		expect(arg.subject).toMatch(/^\[Site\] Landing page que gera lead — /);
		expect(arg.subject).toContain('template mirante');
		expect(arg.subject).not.toContain('<');
		expect(arg.subject).not.toMatch(/[\r\n]/);

		expect(arg.html).toContain('&lt;b&gt;x&lt;/b&gt;');
		expect(arg.html).not.toContain('<b>x</b>');
		expect(arg.html).toContain('Acme &quot;Ltda&quot;');
		expect(arg.html).toContain('ig / bio / ago');
		expect(arg.html).toContain('/templates/mirante');
		expect(arg.text).toContain('Nome: <b>x</b>');
	});

	it('strips CR/LF from the name before it reaches the subject', async () => {
		const res = await call(POST, req({ ...lead(), name: 'Ana\r\nBcc: victim@example.com' }));
		expect(res.status).toBe(200);
		const arg = sendMock.mock.calls[0]![0] as { subject: string };
		expect(arg.subject).not.toMatch(/[\r\n]/);
		expect(arg.subject).toContain('Ana Bcc: victim@example.com');
	});

	it('502 SEND_FAILED when Resend returns an error', async () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		sendMock.mockResolvedValueOnce({ data: null, error: { name: 'validation_error', message: 'nope' } });
		const res = await call(POST, req(lead()));
		expect(res.status).toBe(502);
		expect(await bodyOf(res)).toEqual({ ok: false, code: 'SEND_FAILED' });
		expect(spy).toHaveBeenCalledWith('[contact] resend', { name: 'validation_error', message: 'nope' });
		spy.mockRestore();
	});

	it('500 UNEXPECTED when Resend throws', async () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		sendMock.mockRejectedValueOnce(new Error('boom'));
		const res = await call(POST, req(lead()));
		expect(res.status).toBe(500);
		expect(await bodyOf(res)).toEqual({ ok: false, code: 'UNEXPECTED' });
		spy.mockRestore();
	});
});
