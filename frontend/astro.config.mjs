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

	// The CSS is ~25 KB split into small per-component files; linked, each one is a
	// render-blocking request on first load. Inlined, the HTML carries it.
	build: { inlineStylesheets: 'always' },

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
		imagesConfig: {
			// Allowlist of widths. The adapter drops any `widths` entry not listed here and
			// snaps `width` to the nearest one, so this covers what src/ asks for
			// (portfolio + template demos).
			sizes: [96, 144, 256, 320, 400, 480, 500, 640, 720, 800, 960, 1000, 1100, 1200, 1280, 1300, 1440, 1600, 1920],
			// Without `formats` Vercel serves the source format (JPEG/PNG). AVIF is left out:
			// smaller, but far slower to encode on a cache miss.
			formats: ['image/webp'],
		},
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
