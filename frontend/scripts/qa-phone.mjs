// Phone preview at two desktop sizes: node scripts/qa-phone.mjs <outDir>
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const out = resolve(process.argv[2] ?? 'shots-phone');
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const [name, vp] of Object.entries({ hd: { width: 1920, height: 1080 }, laptop: { width: 1366, height: 768 } })) {
	const page = await browser.newPage({ viewport: vp });
	await page.goto(`${BASE}/templates/mirante`, { waitUntil: 'networkidle' });
	await page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
	await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in')));
	const btn = page.locator('button[aria-pressed]').filter({ hasText: /celular|phone/i }).first();
	await btn.click();
	await page.locator('section.demo').scrollIntoViewIfNeeded();
	await page.waitForTimeout(2000);
	await page.screenshot({ path: resolve(out, `phone-${name}.png`) });
	await page.close();
}
await browser.close();
console.log('done →', out);
