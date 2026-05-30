#!/usr/bin/env node
/**
 * Vercel deprecated `nodejs18.x` as a serverless runtime, but the older
 * @astrojs/vercel adapter still emits it when it can't detect a supported
 * local Node version. This script runs after `astro build` and rewrites
 * every function's `.vc-config.json` to `nodejs20.x`.
 *
 * Drop it (and the package.json build chain) once we upgrade to Astro 5
 * + @astrojs/vercel 8+ — which target newer runtimes natively.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TARGET = 'nodejs20.x';
const FUNCTIONS_DIR = '.vercel/output/functions';

let patched = 0;
let skipped = 0;

function walk(dir) {
	let entries = [];
	try {
		entries = readdirSync(dir);
	} catch {
		return;
	}
	for (const entry of entries) {
		const full = join(dir, entry);
		const stat = statSync(full);
		if (stat.isDirectory()) {
			walk(full);
		} else if (entry === '.vc-config.json') {
			const cfg = JSON.parse(readFileSync(full, 'utf8'));
			if (cfg.runtime && cfg.runtime !== TARGET) {
				const before = cfg.runtime;
				cfg.runtime = TARGET;
				writeFileSync(full, JSON.stringify(cfg, null, 2));
				console.log(`  ✓ ${full}: ${before} → ${TARGET}`);
				patched++;
			} else {
				skipped++;
			}
		}
	}
}

console.log(`Patching Vercel function runtimes to ${TARGET}…`);
walk(FUNCTIONS_DIR);
console.log(`Done. Patched ${patched}, already ok ${skipped}.`);
