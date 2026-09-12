// Detail previews + hero at 1920x1080: node scripts/qa-phone.mjs <outDir>
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const out = resolve(process.argv[2] ?? 'shots-phone');
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const prep = async () => {
	await page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
	await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in')));
};
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await prep();
await page.waitForTimeout(1500);
await page.screenshot({ path: resolve(out, 'hero-hd.png'), clip: { x: 0, y: 0, width: 1920, height: 900 } });
await page.goto(`${BASE}/templates/mirante`, { waitUntil: 'networkidle' });
await prep();
await page.locator('section.demo').scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
await page.screenshot({ path: resolve(out, 'desktop-hd.png') });
await page.locator('button[aria-pressed]').filter({ hasText: /celular|phone/i }).first().click();
await page.locator('section.demo').scrollIntoViewIfNeeded();
await page.waitForTimeout(2000);
await page.screenshot({ path: resolve(out, 'phone-hd.png') });
await browser.close();
console.log('done →', out);
