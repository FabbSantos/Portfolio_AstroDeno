import type { Shape } from '../types';
import type { meta as ptShape } from '../pt/meta';

export const meta: Shape<typeof ptShape> = {
	siteName: 'Fabrício Bahiense',
	home: {
		title: 'Fabrício Bahiense — websites, web systems and AI by a senior engineer',
		description:
			'Senior software engineer in Rio de Janeiro. Landing pages that generate leads, web systems that hold up under load, AI inside your product — no agency in between. Templates live in 3–5 days.',
	},
	about: {
		title: 'About — Fabrício Bahiense',
		description:
			'Senior software engineer since 2018: from PHP to React, Vue, Astro, Node and C# on AWS. Tech Lead of Nexus’ multichannel platform. How I work and availability.',
	},
	work: {
		title: 'Work — Fabrício Bahiense',
		description:
			'Cases that shipped to production: multichannel platform (SMS, WhatsApp, RCS), real-estate launch sites for Conx and Passareli, own products Pulsar and Quasar.',
	},
	templates: {
		title: 'Templates live in 3–5 days — Fabrício Bahiense',
		description:
			'Four templates I wrote myself: real-estate launch, B2B SaaS, studio/agency and e-commerce drop. You pick one, I customize and publish it on your domain.',
	},
	templateDetail: {
		title: '{name} {accent} — template · Fabrício Bahiense',
		description: '{lead}',
	},
	privacy: {
		title: 'Privacy policy — Fabrício Bahiense',
		description: 'What the contact form collects, why, for how long, and how to request deletion.',
	},
	notFound: {
		title: 'Page not found — Fabrício Bahiense',
		description: 'This page does not exist (or moved).',
	},
};
