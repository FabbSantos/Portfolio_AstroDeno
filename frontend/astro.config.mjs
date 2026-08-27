import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// Production host is www (apex 308s to it). Canonical/sitemap/OG must match.
	site: 'https://www.fabbahiense.dev',
	trailingSlash: 'never',
	server: { port: 4321, host: '0.0.0.0' },

	// Static by default; /api/contact opts into SSR with `export const prerender = false`.
	output: 'static',

	// PT-BR at `/`, EN at `/en/…`. Locale is read server-side from the URL
	// (see src/i18n/index.ts) — no client-side text swapping.
	i18n: {
		defaultLocale: 'pt',
		locales: ['pt', 'en'],
		routing: { prefixDefaultLocale: false },
	},

	prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },

	integrations: [
		sitemap({
			i18n: { defaultLocale: 'pt', locales: { pt: 'pt-BR', en: 'en' } },
			// Template demos are noindex and single-locale — keep them out of the sitemap.
			filter: (page) => !/\/templates\/[a-z0-9-]+\/demo\/?$/.test(page),
		}),
	],

	adapter: vercel({
		webAnalytics: { enabled: true },
		// Vercel Image Optimization at the edge: no sharp in the serverless bundle.
		imageService: true,
		devImageService: 'sharp',
	}),

	env: {
		schema: {
			RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
			CONTACT_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
			TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
			PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
		},
	},
});
