import type { Shape } from '../types';
import type { templates as ptShape } from '../pt/templates';

export const templates: Shape<typeof ptShape> = {
	numberWords: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],

	band: {
		eyebrow: 'Templates · sites live in days',
		head: 'Need something',
		headAccent: 'live this week?',
		lead: '{N} templates I wrote myself. You pick one, I swap in your brand, colours and copy and publish it on your domain in {days} business days. From {min} to {max}.',
		viewAll: 'See all templates',
		scoreLine: 'Lowest Lighthouse mobile score: {min}, measured on each demo',
		listLabel: 'Available templates',
		scrollPrev: 'Previous template',
		scrollNext: 'Next template',
	},

	gallery: {
		eyebrow: 'Templates',
		head: 'Pick a',
		headAccent: 'starting point.',
		lead: '{N} directions, {n} audiences. Each one opens a full demo; the price includes customization, domain setup, SEO and {months} months of adjustments.',
		listLabel: 'All templates',
	},

	card: {
		open: 'View template',
		includes: 'Includes domain, SSL, SEO and {months} months of adjustments',
		previewAlt: '{name} template preview',
		hoverHint: 'hover to scroll',
		demo: 'View demo',
		solves: 'Solves:',
		isNew: 'New',
		scoreLabel: 'Lighthouse',
		scoreDevice: 'mobile',
		scoreSr: 'Lighthouse score {score} out of 100, mobile',
		scoreShort: {
			mobile: 'Mobile',
			desktop: 'Desktop',
			accessibility: 'Accessibility',
			bestPractices: 'Best practices',
		},
	},

	solves: {
		salvia: 'a clinic that wants bookings over WhatsApp',
		mirante: 'a real-estate launch that needs leads',
		stratus: 'a B2B SaaS that needs trials',
		atelier: 'a studio or agency that needs a portfolio',
		brava: 'an e-commerce drop with a countdown',
	},

	compare: {
		eyebrow: 'Which one is mine?',
		title: 'Compare in ten seconds',
		sub: 'Audience, timeline and price side by side. Tap a card to select.',
		criterion: 'Criterion',
		rows: {
			who: 'for whom',
			days: 'timeline',
			price: 'from',
			sections: 'sections',
		},
		toggle: {
			label: 'Delivery time',
			standard: 'Standard delivery · {days} business days',
			express: 'Express delivery · {hours}h',
		},
		plansLabel: 'Pick a template',
		selectedLabel: 'Selected',
		deliveryExpress: '{hours}h',
		matrixCaption: 'What comes in each template',
		included: 'Included',
		notIncluded: 'Not included',
		features: {
			lead: 'Lead form + WhatsApp',
			booking: 'WhatsApp booking',
			hours: 'Opening hours with "open now"',
			gallery: 'Photo gallery',
			plans: 'Floor plans and map',
			pricing: 'Pricing and FAQ',
			countdown: 'Countdown and storefront',
			cases: 'Case grid',
			newsletter: 'Newsletter',
			legal: 'Privacy page and 404',
			seo: 'Technical SEO and analytics',
			adjustments: '{months} months of adjustments',
		},
		cta: 'I want {name}',
	},

	detail: {
		back: 'All templates',
		meta: 'Template {n}/{total} · {cat} · delivered in {days} business days',
		want: 'I want this template',
		fullDemo: 'Open demo full screen',
		demoTitle: '{name} template demo',
		demoNote: 'Live demo: scroll and click around. Brand, copy and images are placeholders; yours go in.',
		sectionsTitle: "What's in the template",
		related: 'Other templates',
		scores: {
			title: 'Google Lighthouse score',
			mobile: 'Performance on mobile',
			desktop: 'Performance on desktop',
			accessibility: 'Accessibility',
			bestPractices: 'Best practices',
			outOf: 'out of 100',
			note: 'Measured on this demo with Lighthouse {version}, the same analysis behind PageSpeed Insights. Median of {runs} runs, on {date}.',
		},
		device: {
			label: 'View as',
			desktop: 'Desktop',
			mobile: 'Phone',
		},
	},

	included: {
		title: "What's included",
		items: [
			'Published on your domain (you own the domain; I set up DNS and SSL)',
			'Technical SEO and Lighthouse above 90 on mobile',
			'Logo, colours, copy and image customization',
			'{months} months of adjustments',
			'Code delivered to your repository after payment',
		],
	},

	steps: {
		title: 'How it works',
		items: [
			{
				title: 'Pick a template',
				desc: 'Open the demos, see which one speaks to your audience and send me the link.',
			},
			{
				title: 'I customize it',
				desc: 'Brand, colours, copy and images. You send the material, I adapt it.',
			},
			{
				title: 'It goes live',
				desc: 'On your domain, with SSL and SEO set up. Adjustments included for {months} months.',
			},
		],
	},

	cta: {
		head: 'Is this',
		headAccent: 'the one?',
		sub: 'Send me your domain, logo and what needs to change. In a few business days the site is live.',
		button: 'I want a template',
		whatsappGallery: "Hi Fabrício! I'd like to know more about the templates.",
		whatsappDetail: "Hi Fabrício! I'd like to know more about the {name} template.",
	},

	demoFormNote: 'Demo: the real form is wired up on your deploy',
};
