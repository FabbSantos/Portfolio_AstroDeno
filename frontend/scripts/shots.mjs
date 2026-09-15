/**
 * Screenshots with Playwright against a running preview server.
 *
 *   node scripts/shots.mjs templates   → src/assets/templates/<slug>.jpg
 *                                        FULL-PAGE shot of each demo laid out at 1440px, rasterised at
 *                                        1000px wide (deviceScaleFactor 1000/1440) as JPEG q85 — the card
 *                                        pans over the whole page on hover. Sources stay < 600 KB; Astro
 *                                        re-encodes them to webp at 500/1000 px.
 *   node scripts/shots.mjs qa [outDir] → full-page shots of every route at 390px and 1280px (visual QA)
 *
 * Start the server first:  npx astro dev --port 4321   (astro preview is unsupported by the Vercel adapter)
 * Point at another port with BASE_URL=http://localhost:4399
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const mode = process.argv[2] ?? 'qa';
const outDir = resolve(process.argv[3] ?? (mode === 'templates' ? 'src/assets/templates' : 'shots'));
mkdirSync(outDir, { recursive: true });

const SLUGS = (process.env.SLUGS ?? 'salvia,mirante,stratus,atelier,brava').split(',');
const ROUTES = ['/', '/work', '/about', '/templates', '/templates/mirante', '/templates/mirante/demo', '/templates/brava/demo', '/privacidade', '/en', '/en/work', '/nope-404'];

const browser = await chromium.launch();
// astro dev injects its toolbar; keep it out of every shot.
const HIDE_TOOLBAR = 'astro-dev-toolbar{display:none!important}';
try {
	if (mode === 'templates') {
		const LAYOUT_W = 1440;
		const SHOT_W = 1000;
		const ctx = await browser.newContext({ viewport: { width: LAYOUT_W, height: 900 }, deviceScaleFactor: SHOT_W / LAYOUT_W });
		// `astro dev` HMR would reload the page whenever someone saves a file mid-capture; drop the client.
		await ctx.route('**/@vite/client', (route) => route.abort());

		const capture = async (slug) => {
			const page = await ctx.newPage();
			try {
				await page.goto(`${BASE}/templates/${slug}/demo`, { waitUntil: 'networkidle' });
				// No ribbon/toolbar, no smooth scroll while we walk the page.
				await page.addStyleTag({
					content: `.demo-ribbon{display:none!important}${HIDE_TOOLBAR}html{scroll-behavior:auto!important}`,
				});
				// Walk the page so lazy images and any scroll-driven state are settled before the full-page shot.
				await page.evaluate(async () => {
					document.querySelectorAll('img[loading="lazy"]').forEach((img) => img.setAttribute('loading', 'eager'));
					const h = document.documentElement.scrollHeight;
					for (let y = 0; y < h; y += 700) {
						window.scrollTo(0, y);
						await new Promise((r) => setTimeout(r, 60));
					}
					window.scrollTo(0, 0);
					await Promise.all(
						Array.from(document.images)
							.filter((i) => !i.complete)
							.map((i) => new Promise((r) => { i.onload = i.onerror = r; }))
					);
				});
				await page.waitForTimeout(500);
				const file = resolve(outDir, `${slug}.jpg`);
				await page.screenshot({ path: file, fullPage: true, animations: 'disabled', type: 'jpeg', quality: 85 });
				const height = await page.evaluate(() => document.documentElement.scrollHeight);
				console.log('wrote', file, `${SHOT_W}×${Math.round((height * SHOT_W) / LAYOUT_W)} (layout ${LAYOUT_W}×${height})`);
			} finally {
				await page.close();
			}
		};

		for (const slug of SLUGS) {
			// A stray navigation (dev-server reload) aborts the goto/evaluate — retry the whole capture.
			for (let attempt = 1; ; attempt++) {
				try {
					await capture(slug);
					break;
				} catch (err) {
					if (attempt >= 4) throw err;
					console.warn(`${slug}: attempt ${attempt}/4 failed — ${err.message.split('\n')[0]} — retrying`);
					await new Promise((r) => setTimeout(r, 1500));
				}
			}
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
