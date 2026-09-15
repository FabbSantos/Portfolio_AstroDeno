/**
 * Lighthouse scores of each template demo, measured by
 * `node scripts/lighthouse-templates.mjs` into lighthouse.json. Never typed by
 * hand: a template without an entry simply shows no score.
 */
import data from './lighthouse.json';

export interface TemplateScores {
	/** Performance, mobile preset (the harder one, shown on cards). */
	mobile: number;
	desktop: number;
	accessibility: number;
	bestPractices: number;
	/** YYYY-MM-DD this template was last measured (falls back to the file's date). */
	measuredAt?: string;
}

interface LighthouseData {
	/** YYYY-MM-DD */
	measuredAt: string;
	source: string;
	lighthouse: string;
	/** Runs per template and preset; each score is their median. */
	runs: number;
	templates: Record<string, TemplateScores | undefined>;
}

export const lighthouse = data as LighthouseData;

export const scoresFor = (slug: string): TemplateScores | undefined => lighthouse.templates[slug];

/** Lighthouse colour band: 90+ good, 50 to 89 average, below 50 poor. */
export const band = (score: number): 'good' | 'average' | 'poor' => (score >= 90 ? 'good' : score >= 50 ? 'average' : 'poor');
