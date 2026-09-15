/**
 * Measures every template demo with Lighthouse and writes src/data/lighthouse.json,
 * the numbers shown on template cards, sales pages and demo ribbons.
 *
 *   node scripts/lighthouse-templates.mjs                       → production (www.fabbahiense.dev)
 *   BASE_URL=http://localhost:4400 node scripts/lighthouse-templates.mjs
 *   SLUGS=salvia RUNS=5 node scripts/lighthouse-templates.mjs   → only some templates, more runs
 *
 * Median of RUNS (default 3, keep it odd) mobile and desktop runs each.
 * SEO is not collected: demos are noindex on purpose, so that score would say
 * nothing about a client's site. Runs `npx lighthouse` (no dependency) with the
 * installed Chrome; set CHROME_PATH if it isn't found. Existing entries for
 * templates not measured this time are kept.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src', 'data', 'lighthouse.json');
const BASE = (process.env.BASE_URL ?? 'https://www.fabbahiense.dev').replace(/\/$/, '');
const RUNS = Math.max(1, Number(process.env.RUNS ?? 3));
const LIGHTHOUSE = 'lighthouse@13.4.1';

const allSlugs = [...readFileSync(join(ROOT, 'src', 'data', 'templates.ts'), 'utf8').matchAll(/\bslug: '([a-z0-9-]+)'/g)].map((m) => m[1]);
const slugs = process.env.SLUGS ? process.env.SLUGS.split(',').filter((s) => allSlugs.includes(s)) : allSlugs;
if (!slugs.length) throw new Error(`no templates to measure (known: ${allSlugs.join(', ')})`);

const median = (xs) => {
	const s = [...xs].sort((a, b) => a - b);
	return s[Math.floor((s.length - 1) / 2)];
};
const pct = (cat) => (cat && typeof cat.score === 'number' ? Math.round(cat.score * 100) : null);

function lighthouse(url, desktop) {
	const dir = mkdtempSync(join(tmpdir(), 'lh-'));
	const file = join(dir, 'report.json');
	const args = [
		'-y',
		LIGHTHOUSE,
		url,
		'--output=json',
		`--output-path=${file}`,
		'--only-categories=performance,accessibility,best-practices',
		'--quiet',
		'--chrome-flags=--headless=new',
		...(desktop ? ['--preset=desktop'] : []),
	];
	const res = spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', args, { encoding: 'utf8', shell: process.platform === 'win32' });
	try {
		if (!existsSync(file)) throw new Error(`lighthouse failed for ${url}\n${res.stderr?.slice(-800) ?? ''}`);
		const { categories } = JSON.parse(readFileSync(file, 'utf8'));
		return { performance: pct(categories.performance), accessibility: pct(categories.accessibility), bestPractices: pct(categories['best-practices']) };
	} finally {
		rmSync(dir, { recursive: true, force: true });
	}
}

// local calendar date (sv-SE formats as YYYY-MM-DD); UTC would read tomorrow on a late-evening run in Brazil
const today = new Date().toLocaleDateString('sv-SE');
const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { templates: {} };
const templates = { ...previous.templates };

for (const slug of slugs) {
	const url = `${BASE}/templates/${slug}/demo`;
	const mobile = [];
	for (let i = 0; i < RUNS; i++) {
		mobile.push(lighthouse(url, false));
		console.log(`${slug} mobile #${i + 1}`, JSON.stringify(mobile.at(-1)));
	}
	const desktop = [];
	for (let i = 0; i < RUNS; i++) {
		desktop.push(lighthouse(url, true));
		console.log(`${slug} desktop #${i + 1}`, JSON.stringify(desktop.at(-1)));
	}
	templates[slug] = {
		mobile: median(mobile.map((r) => r.performance)),
		desktop: median(desktop.map((r) => r.performance)),
		accessibility: median(mobile.map((r) => r.accessibility)),
		bestPractices: median(mobile.map((r) => r.bestPractices)),
		measuredAt: today,
	};
	console.log(`${slug} →`, JSON.stringify(templates[slug]));
}

const data = { measuredAt: today, source: BASE, lighthouse: LIGHTHOUSE.split('@')[1], runs: RUNS, templates };
writeFileSync(OUT, JSON.stringify(data, null, '\t') + '\n');
console.log('wrote', OUT);
