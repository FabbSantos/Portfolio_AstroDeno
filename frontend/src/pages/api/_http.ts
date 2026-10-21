/**
 * Helpers shared by the API routes. Underscore-prefixed so Astro's router
 * ignores the file (everything else under src/pages becomes a route).
 */

const ALLOWED_HOSTS = new Set(['www.fabbahiense.dev', 'fabbahiense.dev']);
const LOCAL_HOSTS = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;

/** JSON response, never cached. */
export function json(status: number, body: { ok: boolean; code?: string }, extra: Record<string, string> = {}): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...extra },
	});
}

export function clientIp(request: Request): string {
	const xff = request.headers.get('x-forwarded-for') ?? '';
	const first = xff.split(',')[0]?.trim();
	return first || request.headers.get('x-real-ip') || 'unknown';
}

/** Same-origin requests only: the site itself, its Vercel previews, localhost in dev. */
export function originAllowed(request: Request): boolean {
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
