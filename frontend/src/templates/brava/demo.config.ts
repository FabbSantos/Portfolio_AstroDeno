/**
 * Brava demo config — the portfolio demo at /templates/brava/demo.
 * Placeholder brand and copy; photos under the Unsplash License (dark
 * fashion editorial and flat lays, no faces tied to a real brand). A client
 * project gets a `site.config.ts` with the same shape (scripts/new-client.mjs).
 */
import { defineBrava } from './schema';

import hero1 from './assets/demo/hero-1.jpg';
import hero2 from './assets/demo/hero-2.jpg';
import hero3 from './assets/demo/hero-3.jpg';
import product1 from './assets/demo/product-1.jpg';
import product2 from './assets/demo/product-2.jpg';
import product3 from './assets/demo/product-3.jpg';
import product4 from './assets/demo/product-4.jpg';
import product5 from './assets/demo/product-5.jpg';
import product6 from './assets/demo/product-6.jpg';
import lookbook1 from './assets/demo/lookbook-1.jpg';
import lookbook2 from './assets/demo/lookbook-2.jpg';
import lookbook3 from './assets/demo/lookbook-3.jpg';
import lookbook4 from './assets/demo/lookbook-4.jpg';

export default defineBrava({
	brand: {
		name: 'Brava',
		tagline: 'Small batches. Made on purpose.',
		logo: null,
		locale: 'en',
	},
	/* Dark by default: near-black ground, paper ink, lacquer red as the one colour. */
	theme: {
		accent: '#d8232a',
		accent2: '#f1a3a6',
		bg: '#121212',
		bg2: '#1c1c1c',
		ink: '#f3f1ea',
		radius: 0,
	},
	seo: {
		title: 'Brava Vitrine: template demo',
		description: 'Demo of the Brava template: limited-drop e-commerce landing by Fab Bahiense. Placeholder data.',
		canonical: 'https://www.fabbahiense.dev/templates/brava/demo',
		ogImage: hero1,
	},
	contact: {
		form: {
			provider: 'none',
			successMessage: "You're on the list. See you next drop.",
		},
	},
	analytics: {},
	legal: {
		lines: ['© 2026 Brava · Made in Brazil, shipped from São Paulo.'],
	},
	nav: [
		{ label: 'Shop', href: '#shop' },
		{ label: 'Lookbook', href: '#lookbook' },
		{ label: 'Story', href: '#story' },
	],

	ticker: {
		messages: ['Drop 03 / Verão · live until September 30', 'Free shipping over R$ 300', 'Pre-orders ship in 7 days', 'Only 250 pieces per drop'],
	},

	topbar: {
		brandHref: '#top',
		links: [
			{ label: 'Search', href: '#' },
			{ label: 'Account', href: '#' },
		],
		cart: { show: true, label: 'Cart', href: '#', count: 2 },
	},

	drop: {
		endsAt: '2026-09-30T23:59:59-03:00',
		countdownLabel: 'Time until the drop ends',
		units: { days: 'days', hours: 'hours', minutes: 'min', seconds: 'sec' },
		ended: 'This drop has ended. Sign up below to hear about the next one.',
	},

	hero: {
		eyebrow: 'Drop 03 / Verão · 250 pieces · live now',
		lines: ['The summer', '**that ends**', '==too fast.=='],
		sub: "Six pieces, made in Brazil, shipped worldwide. When they're gone, they're gone. We don't restock.",
		cta: { label: 'Shop the drop', href: '#shop' },
		tiles: [
			{ image: hero1, alt: 'Model in a black shirt and wide-brim hat, lit from the side' },
			{ image: hero2, alt: 'Model in a long black coat against a dark stone wall' },
			{ image: hero3, alt: 'Grey wool blazer over a black top, black and white' },
		],
	},

	shop: {
		eyebrow: 'The drop · six pieces',
		title: 'Take **your pick.**',
		soldLabel: 'Sold out',
		products: [
			{ n: '001', name: 'Vento Tee', price: 'R$ 189', tag: 'OG', image: product1, alt: 'Folded tees in charcoal, grey and sand', href: '#shop' },
			{ n: '002', name: 'Maré Jacket', price: 'R$ 459', tag: 'New', image: product2, alt: 'Tan work jacket laid flat with black jeans and sneakers', href: '#shop' },
			{ n: '003', name: 'Costa Cap', price: 'R$ 149', image: product3, alt: 'Pink cap on a black tee next to a white sweatshirt', href: '#shop' },
			{ n: '004', name: 'Duna Pants', price: 'R$ 329', tag: 'Last', image: product4, alt: 'Khaki pants, grey tee and sneakers laid flat on a dark floor', href: '#shop' },
			{ n: '005', name: 'Brisa Overshirt', price: 'R$ 389', sold: true, image: product5, alt: 'Brown overshirt with black jeans and canvas sneakers', href: '#shop' },
			{ n: '006', name: 'Sol Parka', price: 'R$ 689', image: product6, alt: 'Orange parka crumpled on a dark surface', href: '#shop' },
		],
	},

	lookbook: {
		title: 'Lookbook',
		eyebrow: 'Drop 03 · lookbook',
		caption: 'Shot in Rio, March 2026. Photography by Maré Studio.',
		tiles: [
			{ image: lookbook1, alt: 'Model in a black satin coat holding the hem, in a dark room', caption: 'Look 01 · Maré coat, night' },
			{ image: lookbook2, alt: 'Model with locs in a colour-block jacket and cap against a stone wall', caption: 'Look 02 · Sol jacket, Costa cap' },
			{ image: lookbook3, alt: 'Model in a black dress and patterned tights, studio light', caption: 'Look 03 · Vento dress' },
			{ image: lookbook4, alt: 'Two people walking with a skateboard, orange and white pants', caption: 'Look 04 · Duna pants, on the street' },
		],
	},

	story: {
		eyebrow: 'The story',
		title: 'Small batches. ==Made on purpose.==',
		paragraphs: [
			'Brava is a Brazilian label run by two friends. We design, sample and stitch each piece in Rio, then ship from a single warehouse in São Paulo.',
			"We release four drops a year, 200 to 300 pieces each. No restocks, no seasons, no Black Friday. When a piece sells out it's gone, and we move on to the next thing.",
		],
		link: { label: 'Read more', href: '#' },
	},

	newsletter: {
		title: 'Be first **next drop.**',
		sub: 'One email per drop. Never marketing, just the link, the date, and a thank you.',
		email: { label: 'Your email', placeholder: 'you@email.com' },
		cta: 'Notify me',
	},

	footer: {
		columns: [
			{
				h: 'Shop',
				links: [
					{ label: 'The drop', href: '#shop' },
					{ label: 'Archive', href: '#' },
					{ label: 'Gift cards', href: '#' },
				],
			},
			{
				h: 'Help',
				links: [
					{ label: 'Shipping', href: '#' },
					{ label: 'Returns', href: '#' },
					{ label: 'Size guide', href: '#' },
				],
			},
			{
				h: 'Brava',
				links: [
					{ label: 'Story', href: '#story' },
					{ label: 'Press', href: '#' },
					{ label: 'Contact', href: '#' },
				],
			},
		],
		socials: [
			{ label: 'Instagram', href: '#' },
			{ label: 'TikTok', href: '#' },
		],
		privacyLabel: 'Privacy',
	},
});
