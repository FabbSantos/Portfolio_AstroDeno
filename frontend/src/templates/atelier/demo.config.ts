/**
 * Demo config for the portfolio page /templates/atelier/demo.
 * Fictional studio, placeholder photos (picsum). form.provider 'none' → the
 * form (if any) only shows the demo note.
 */
import { defineAtelier } from './schema';
import case1 from './assets/demo/case-1.jpg';
import case2 from './assets/demo/case-2.jpg';
import case3 from './assets/demo/case-3.jpg';
import case4 from './assets/demo/case-4.jpg';
import case5 from './assets/demo/case-5.jpg';
import case6 from './assets/demo/case-6.jpg';

export default defineAtelier({
	brand: { name: 'Atelier', tagline: 'Independent design studio', locale: 'en' },
	theme: { accent: '#7c3aed', bg: '#fbfafd', ink: '#1a1525', radius: 12 },
	seo: {
		title: 'Atelier Studio: template demo',
		description: 'Demo of the Atelier template: studio / agency portfolio by Fab Bahiense. Placeholder data.',
		canonical: 'https://www.fabbahiense.dev/templates/atelier/demo',
	},
	analytics: {},
	legal: { lines: [] },
	nav: [
		{ label: 'Work', href: '#work' },
		{ label: 'Process', href: '#process' },
		{ label: 'Studio', href: '#studio' },
		{ label: 'Contact', href: '#contact' },
	],

	topbar: {
		mark: '◆',
		brandHref: '#top',
		cta: { label: 'Start a project ↗', href: '#contact' },
	},

	hero: {
		eyebrow: '// Independent design studio · est. 2019',
		title: 'We make **quiet brands**\nthat get ==louder== over time.',
		meta: [
			{ label: 'Available', value: 'Q2 / 2026 · 1 spot' },
			{ label: 'Based', value: 'Rio de Janeiro / remote' },
			{ label: 'For', value: 'Founders, agencies, in‑house teams' },
		],
	},

	work: {
		eyebrow: '// Selected work · 2024 to 2026',
		title: 'Six projects, **one principle:** design that ships.',
		cases: [
			{ n: '01', client: 'Forma Health', tag: 'Brand + product', year: '2026', image: case1 },
			{ n: '02', client: 'Helios Studio', tag: 'Identity', year: '2025', image: case2, tint: '#fbe07e' },
			{ n: '03', client: 'Ribeira Café', tag: 'Packaging + e-commerce', year: '2025', image: case3, tint: '#f9c4e3' },
			{ n: '04', client: 'Maré', tag: 'App + design system', year: '2024', image: case4, tint: '#b8f5cb' },
			{ n: '05', client: 'Northbound', tag: 'Marketing site', year: '2024', image: case5, tint: '#ffd4c2' },
			{ n: '06', client: 'Vector One', tag: 'Brand refresh', year: '2024', image: case6, tint: '#a1f3f9' },
		],
		archive: { label: 'View the full archive →', href: '#work' },
	},

	process: {
		eyebrow: '// How we work',
		title: 'A simple **four-step** process.',
		lead: 'No agency theater. No 80-page decks. Just enough structure to keep momentum and protect quality.',
		steps: [
			{ n: '01', t: 'Discovery', d: 'Two weeks of conversation, audit and listening. We end with one page of strategy. Not fifty.' },
			{ n: '02', t: 'Design', d: 'Direction first, then refinement. You see three real options, never six abstract concepts.' },
			{ n: '03', t: 'Build', d: 'Production-grade engineering from week one. No "handoff" gap, no design that breaks at scale.' },
			{ n: '04', t: 'Ship & Hold', d: 'Launch is the start, not the end. Three months of free iterations included on every project.' },
		],
	},

	studio: {
		eyebrow: '// The studio',
		title: 'Small on purpose.',
		paragraphs: [
			'We\'re a two-person studio by design. Every project gets senior attention from the first sketch to the last commit. No account managers, no telephone game, no "let me check with the team."',
			'We take on six to eight projects a year. Each one starts with a conversation, never a form.',
		],
		link: { label: 'Read the manifesto →', href: '#contact' },
		stats: [
			{ v: '42', l: 'brands shipped' },
			{ v: '96%', l: 'retention after launch' },
			{ v: '2', l: 'partners, no payroll' },
			{ v: '0', l: 'discovery decks' },
		],
	},

	contact: {
		email: 'hello@atelier.studio',
		form: { provider: 'none' },
		eyebrow: '// Let\'s begin',
		title: 'Have something **worth making?**\nTell us about it.',
		sub: 'We answer every email within two business days, usually with a calendar link or a polite no.',
		socialsLead: 'or follow along',
		socials: [
			{ label: 'Instagram', href: 'https://www.instagram.com/' },
			{ label: 'Are.na', href: 'https://www.are.na/' },
			{ label: 'Read.cv', href: 'https://read.cv/' },
		],
	},

	footer: {
		line: '© 2026 · Independent design studio · Rio de Janeiro',
	},
});
