/**
 * QA shots for the 21st-inspired pieces (desktop 1280 + mobile 390) against a running dev server:
 *   node scripts/qa-21st.mjs <outDir>
 * Captures: pricing table (standard / express, 2nd plan selected), phone-frame preview,
 * WhatsApp FAB (hover with label), home mobile with the FAB.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const out = resolve(process.argv[2] ?? 'shots-21st');
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const hide = (page) => page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
const settle = async (page) => {
	await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in')));
	await page.waitForTimeout(400);
};

const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

// /templates pricing table
await page.goto(`${BASE}/templates`, { waitUntil: 'networkidle' });
await hide(page);
await settle(page);
const cmp = page.locator('section.compare, [aria-labelledby="compare-title"]').first();
await cmp.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await cmp.screenshot({ path: resolve(out, 'pricing-standard.png') });
const expressBtn = page.locator('[aria-pressed]').filter({ hasText: /express/i }).first();
if (await expressBtn.count()) {
	await expressBtn.click();
	await page.waitForTimeout(600);
}
const plan2 = cmp.locator('button[aria-pressed]').nth(3);
if (await plan2.count()) {
	await plan2.click();
	await page.waitForTimeout(500);
}
await cmp.screenshot({ path: resolve(out, 'pricing-express-selected.png') });

// /templates/mirante device toggle
await page.goto(`${BASE}/templates/mirante`, { waitUntil: 'networkidle' });
await hide(page);
await settle(page);
const demoSec = page.locator('section.demo').first();
await demoSec.scrollIntoViewIfNeeded();
const mobileBtn = page.locator('button[aria-pressed]').filter({ hasText: /celular|phone/i }).first();
if (await mobileBtn.count()) {
	await mobileBtn.click();
	await page.waitForTimeout(2500);
}
await demoSec.screenshot({ path: resolve(out, 'detail-phone.png') });

// WhatsApp FAB on home (scroll past hero, hover)
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await hide(page);
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(900);
const fab = page.locator('[data-wa-fab]');
await fab.hover();
await page.waitForTimeout(700);
await page.screenshot({ path: resolve(out, 'fab-hover.png'), clip: { x: 780, y: 560, width: 500, height: 240 } });

// mobile home with FAB
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await hide(m);
await m.evaluate(() => window.scrollTo(0, 1200));
await m.waitForTimeout(900);
await m.screenshot({ path: resolve(out, 'mobile-fab.png') });

await browser.close();
console.log('done →', out);
