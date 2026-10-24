/**
 * IndexNow (https://www.indexnow.org): tells Bing, and the other engines that
 * share the protocol (Yandex, Seznam, Naver…), which pages changed, right after
 * a production deploy. Bing feeds ChatGPT search and Copilot, so new or edited
 * pages reach them in days instead of weeks.
 *
 * Reads the live sitemap, fetches every page plus /llms.txt and hashes what a
 * reader or a crawler cares about (title, description, JSON-LD and the text of
 * <main>; build asset names are ignored). Only URLs whose hash changed since the
 * last run are submitted. Hashes live in INDEXNOW_STATE, kept between runs by
 * the workflow's cache; the first run submits everything.
 *
 * The key is public by design: Bing checks that /<key>.txt on the site holds it.
 *
 * Run by .github/workflows/indexnow.yml. By hand: node scripts/indexnow.mjs --dry-run
 */
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const SITE = 'https://www.fabbahiense.dev';
const KEY = 'ae66c8659f3ad15665aaf14c551f3849';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const STATE = process.env.INDEXNOW_STATE ?? '.indexnow-state.json';
const DRY = process.argv.includes('--dry-run');

const get = async (url) => {
	const res = await fetch(url, { headers: { 'user-agent': 'fabbahiense-indexnow/1.0' } });
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	return res.text();
};
const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);

/** What changes when the content changes, not when a CSS file gets a new name. */
function fingerprint(url, body) {
	if (!/<html/i.test(body)) return hash(body);
	const pick = (re) => [...body.matchAll(re)].map((m) => m[1]).join('\n');
	const title = pick(/<title>([\s\S]*?)<\/title>/gi);
	const description = pick(/<meta name="description" content="([^"]*)"/gi);
	const ld = pick(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
	const main = (body.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? body)
		.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	return hash([url, title, description, ld, main].join('\n'));
}

const index = await get(`${SITE}/sitemap-index.xml`);
const urls = [];
for (const sitemap of locs(index)) urls.push(...locs(await get(sitemap)));
urls.push(`${SITE}/llms.txt`);

let previous = {};
try {
	previous = JSON.parse(await readFile(STATE, 'utf8'));
} catch {
	console.log('No previous state: submitting every URL.');
}

const current = {};
const changed = [];
for (const url of urls) {
	try {
		current[url] = fingerprint(url, await get(url));
		if (previous[url] !== current[url]) changed.push(url);
	} catch (e) {
		console.warn(`skip ${url}: ${e.message}`);
		if (previous[url]) current[url] = previous[url];
	}
}

console.log(`${urls.length} URLs, ${changed.length} changed.`);
changed.forEach((u) => console.log(`  ${u}`));

if (changed.length && !DRY) {
	const res = await fetch(ENDPOINT, {
		method: 'POST',
		headers: { 'content-type': 'application/json; charset=utf-8' },
		body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: changed }),
	});
	// 200 / 202 = accepted. 403 = key file not found yet, 422 = URL outside the host, 429 = too many.
	console.log(`IndexNow: ${res.status} ${res.statusText}`);
	if (res.status !== 200 && res.status !== 202) {
		console.log(await res.text());
		process.exit(1);
	}
}

if (!DRY) await writeFile(STATE, JSON.stringify(current, null, 2));
