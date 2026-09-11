/**
 * Screenshots with Playwright against a running preview server.
 *
 *   node scripts/shots.mjs templates   → src/assets/templates/<slug>.png (card previews, 1440×900 @1x)
 *   node scripts/shots.mjs qa [outDir] → full-page shots of every route at 390px and 1280px (visual QA)
 *
 * Start the server first:  npm run build && npx astro preview --port 4321
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const mode = process.argv[2] ?? 'qa';
const outDir = resolve(process.argv[3] ?? (mode === 'templates' ? 'src/assets/templates' : 'shots'));
mkdirSync(outDir, { recursive: true });

const SLUGS = ['mirante', 'stratus', 'atelier', 'brava'];
const ROUTES = ['/', '/work', '/about', '/templates', '/templates/mirante', '/templates/mirante/demo', '/templates/brava/demo', '/privacidade', '/en', '/en/work', '/nope-404'];

const browser = await chromium.launch();
// astro dev injects its toolbar; keep it out of every shot.
const HIDE_TOOLBAR = 'astro-dev-toolbar{display:none!important}';
try {
	if (mode === 'templates') {
		const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
		const page = await ctx.newPage();
		for (const slug of SLUGS) {
			await page.goto(`${BASE}/templates/${slug}/demo`, { waitUntil: 'networkidle' });
			await page.addStyleTag({ content: `.demo-ribbon{display:none!important}${HIDE_TOOLBAR}` });
			await page.waitForTimeout(400);
			const file = resolve(outDir, `${slug}.png`);
			await page.screenshot({ path: file, fullPage: false });
			console.log('wrote', file);
		}
	} else {
		for (const [name, vp] of Object.entries({ mobile: { width: 390, height: 844 }, desktop: { width: 1280, height: 800 } })) {
			const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
			const page = await ctx.newPage();
			for (const route of ROUTES) {
				const res = await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
				await page.addStyleTag({ content: HIDE_TOOLBAR });
				// force reveal-on-scroll elements visible and lazy images loaded for the shot
				await page.evaluate(async () => {
					document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
					document.querySelectorAll('img[loading="lazy"]').forEach((img) => img.setAttribute('loading', 'eager'));
					await Promise.all(Array.from(document.images).filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; })));
				});
				await page.waitForTimeout(500);
				const file = resolve(outDir, `${name}${route === '/' ? '-home' : route.replace(/\//g, '-')}.png`);
				await page.screenshot({ path: file, fullPage: true });
				console.log(res?.status(), route, '→', file);
			}
			await ctx.close();
		}
	}
} finally {
	await browser.close();
}
