/**
 * Unit tests for POST /api/previa-aberta (preview opened / WhatsApp tapped → e-mail).
 * Underscore-prefixed so Astro's router ignores it.
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
}));

import { ALL, POST, describeAgent, describePlace } from './previa-aberta';

const API = 'https://www.fabbahiense.dev/api/previa-aberta';
const ORIGIN = 'https://www.fabbahiense.dev';
const IPHONE_IG = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 350.0';

let ipSeq = 0;
const freshIp = () => `10.1.${Math.floor(++ipSeq / 256)}.${ipSeq % 256}`;

function req(body: unknown, headers: Record<string, string> = {}, ip = freshIp()): Request {
	return new Request(API, {
		method: 'POST',
		headers: new Headers({ 'content-type': 'application/json', origin: ORIGIN, 'x-forwarded-for': ip, 'user-agent': IPHONE_IG, ...headers }),
		body: JSON.stringify(body),
	});
}

type Ctx = Parameters<typeof POST>[0];
const call = (request: Request) => POST({ request } as unknown as Ctx);
const bodyOf = async (res: Response) => (await res.json()) as { ok: boolean; code?: string };

beforeEach(() => {
	sendMock.mockReset();
	sendMock.mockResolvedValue({ data: { id: 'email_1' }, error: null });
});

describe('POST /api/previa-aberta', () => {
	it('405 on GET via ALL', async () => {
		const res = await ALL({ request: new Request(API) } as unknown as Ctx);
		expect(res.status).toBe(405);
	});

	it('403 on a foreign origin', async () => {
		const res = await call(req({ slug: 'andrea-monteiro', event: 'open' }, { origin: 'https://evil.example' }));
		expect(res.status).toBe(403);
		expect(sendMock).not.toHaveBeenCalled();
	});

	it('400 on an unknown preview or event', async () => {
		expect((await call(req({ slug: 'nope', event: 'open' }))).status).toBe(400);
		expect((await call(req({ slug: 'andrea-monteiro', event: 'hack' }))).status).toBe(400);
		expect(sendMock).not.toHaveBeenCalled();
	});

	it('200: mails who, when, where, on what and from where', async () => {
		const res = await call(
			req(
				{ slug: 'la-belle-glamour', event: 'open', ref: 'l.instagram.com', path: '/previas/la-belle-glamour?v=2' },
				{ 'x-vercel-ip-city': 'Rio%20de%20Janeiro', 'x-vercel-ip-country-region': 'RJ', 'x-vercel-ip-country': 'BR' },
			),
		);
		expect(res.status).toBe(200);
		expect(await bodyOf(res)).toEqual({ ok: true });
		expect(sendMock).toHaveBeenCalledTimes(1);
		const arg = sendMock.mock.calls[0]![0] as { to: string; subject: string; text: string };
		expect(arg.to).toBe('x@y.z');
		expect(arg.subject).toBe('[Prévia] La Belle Glamour Concept: abriu a prévia');
		expect(arg.text).toContain('Onde: Rio de Janeiro, RJ, BR');
		expect(arg.text).toContain('Aparelho: celular · Instagram (app)');
		expect(arg.text).toContain('Veio de: l.instagram.com');
		expect(arg.text).toContain('https://www.fabbahiense.dev/previas/la-belle-glamour?v=2');
	});

	it('mails the same IP + preview + event once per window, other events still go', async () => {
		const ip = freshIp();
		await call(req({ slug: 'andrea-monteiro', event: 'open' }, {}, ip));
		const again = await call(req({ slug: 'andrea-monteiro', event: 'open' }, {}, ip));
		expect(await bodyOf(again)).toEqual({ ok: true, code: 'ALREADY_SENT' });
		await call(req({ slug: 'andrea-monteiro', event: 'whatsapp' }, {}, ip));
		expect(sendMock).toHaveBeenCalledTimes(2);
		expect((sendMock.mock.calls[1]![0] as { subject: string }).subject).toContain('tocou no WhatsApp');
	});

	it('502 when Resend fails, and the next try is not deduped', async () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		const ip = freshIp();
		sendMock.mockResolvedValueOnce({ data: null, error: { name: 'x', message: 'nope' } });
		expect((await call(req({ slug: 'andrea-monteiro', event: 'open' }, {}, ip))).status).toBe(502);
		expect((await call(req({ slug: 'andrea-monteiro', event: 'open' }, {}, ip))).status).toBe(200);
		spy.mockRestore();
	});
});

describe('describeAgent / describePlace', () => {
	it('names the device and the browser or app', () => {
		expect(describeAgent(IPHONE_IG)).toBe('celular · Instagram (app)');
		expect(describeAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36')).toBe('computador · Chrome');
		expect(describeAgent('Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36')).toBe('celular · Chrome');
	});
	it('falls back when there are no geo headers', () => {
		expect(describePlace(new Headers())).toBe('não informado');
	});
});
