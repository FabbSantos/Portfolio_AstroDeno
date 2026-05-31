import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
	site: 'https://fabbahiense.dev',
	server: { port: 4321, host: '0.0.0.0' },
	integrations: [tailwind(), vue(), sitemap()],
	// Astro 5: `hybrid` is gone. Default is static; routes opt-in to SSR via
	// `export const prerender = false` (see /api/contact.ts).
	output: 'static',
	adapter: vercel({
		webAnalytics: { enabled: true },
	}),
});
