/**
 * Hover-state QA shots (desktop 1280px) against a running dev server:
 *   node scripts/hover-qa.mjs <outDir>
 * Captures: hero, services row with the 3rd card hovered (preview panel switched),
 * a template card mid-pan, the /templates compare strip with a hot column.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const out = resolve(process.argv[2] ?? 'shots-hover');
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const hide = () => page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
const settle = async () => {
	await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in')));
	await page.waitForTimeout(400);
};

await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await hide();
await settle();
await page.waitForTimeout(1200); // hero enter animations
await page.screenshot({ path: resolve(out, 'hero.png'), clip: { x: 0, y: 0, width: 1280, height: 800 } });

// Services: hover the 3rd card, wait for the crossfade, shoot the section.
const svc = page.locator('#servicos');
await svc.scrollIntoViewIfNeeded();
await settle();
const cards = svc.locator('[data-svc-card]');
console.log('service cards:', await cards.count());
await cards.nth(2).hover();
await page.waitForTimeout(700);
await svc.screenshot({ path: resolve(out, 'services-hover-3.png') });
await cards.nth(0).hover();
await page.waitForTimeout(700);
await svc.screenshot({ path: resolve(out, 'services-hover-1.png') });

// Template card mid-pan
const band = page.locator('#templates');
await band.scrollIntoViewIfNeeded();
await settle();
const card = band.locator('[data-card]').first();
await card.hover();
await page.waitForTimeout(2500);
await band.screenshot({ path: resolve(out, 'templates-band-hover.png') });

// Work rows hover
const works = page.locator('#trabalhos');
await works.scrollIntoViewIfNeeded();
await settle();
await works.locator('a').nth(1).hover();
await page.waitForTimeout(500);
await works.screenshot({ path: resolve(out, 'works-hover.png') });

// /templates compare strip
await page.goto(`${BASE}/templates`, { waitUntil: 'networkidle' });
await hide();
await settle();
const cmp = page.locator('[data-hot], .compare, table').first();
if (await cmp.count()) {
	await cmp.scrollIntoViewIfNeeded();
	const col = cmp.locator('th, td').nth(2);
	await col.hover().catch(() => {});
	await page.waitForTimeout(400);
	await cmp.screenshot({ path: resolve(out, 'templates-compare.png') });
}
await page.screenshot({ path: resolve(out, 'templates-page.png'), fullPage: true });

await browser.close();
console.log('done →', out);
