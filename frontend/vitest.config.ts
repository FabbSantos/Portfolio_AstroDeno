import { defineConfig, type Plugin } from 'vitest/config';

/**
 * `astro:env/server` is a virtual module that only exists inside Astro's Vite
 * pipeline. Resolve it to a stub here so endpoint modules can be imported in
 * unit tests; tests override the values with `vi.mock('astro:env/server', …)`.
 */
const ASTRO_ENV_ID = 'astro:env/server';
const astroEnvStub = (): Plugin => ({
	name: 'astro-env-stub',
	resolveId(id) {
		return id === ASTRO_ENV_ID ? `\0${ASTRO_ENV_ID}` : null;
	},
	load(id) {
		if (id !== `\0${ASTRO_ENV_ID}`) return null;
		return [
			'export const RESEND_API_KEY = process.env.RESEND_API_KEY;',
			'export const CONTACT_TO = process.env.CONTACT_TO;',
			'export const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;',
		].join('\n');
	},
});

export default defineConfig({
	plugins: [astroEnvStub()],
	test: {
		environment: 'node',
		// Astro treats every file under src/pages as a route, so test files there
		// must carry a leading underscore to be ignored by the router.
		include: ['src/**/*.test.ts'],
	},
});
