import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// __ADAPTER__ import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	// Canonical host. Must match seo.canonical in src/site.config.ts.
	site: process.env.SITE_URL || 'https://__DOMAIN__',
	trailingSlash: 'never',

	// Static site. With form provider 'resend' | 'webhook' the scaffold enables
	// the Vercel adapter below and src/pages/api/lead.ts opts into SSR.
	output: 'static',

	integrations: [
		sitemap({
			// Thank-you page is noindex; keep it out of the sitemap.
			filter: (page) => !/\/obrigado$/.test(page),
		}),
	],

	// __ADAPTER__ adapter: vercel({ imageService: true, devImageService: 'sharp' }),
});
