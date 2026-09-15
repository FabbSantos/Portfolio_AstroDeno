import type { Shape } from '../types';
import type { meta as ptShape } from '../pt/meta';

export const meta: Shape<typeof ptShape> = {
	siteName: 'Fabrício Bahiense',
	home: {
		title: 'Fabrício Bahiense: websites, web systems and AI by a senior engineer',
		description:
			'Senior software engineer in Rio de Janeiro. Landing pages that generate leads, web systems that hold up under load and AI inside your product. Templates live in 3 to 5 days.',
	},
	about: {
		title: 'About · Fabrício Bahiense',
		description:
			'Senior software engineer since 2018: from PHP to React, Vue, Astro, Node and C# on AWS. Tech Lead of Nexus’ multichannel platform. How I work and availability.',
	},
	work: {
		title: 'Work · Fabrício Bahiense',
		description:
			'Cases that shipped to production: multichannel platform (SMS, WhatsApp, RCS), real-estate launch sites for Conx and Passareli, own products Pulsar and Quasar.',
	},
	templates: {
		title: 'Templates live in 3 to 5 days · Fabrício Bahiense',
		description:
			'Five site structures I wrote myself: booking, lead capture, product with plans, portfolio and storefront. They fit a clinic, a salon, a shop, an office or whatever your business is. You pick one, I customize and publish it on your domain.',
	},
	templateDetail: {
		title: '{name} · template · Fabrício Bahiense',
		description: '{lead}',
	},
	privacy: {
		title: 'Privacy policy · Fabrício Bahiense',
		description: 'What the contact form collects, why, for how long, and how to request deletion.',
	},
	notFound: {
		title: 'Page not found · Fabrício Bahiense',
		description: 'This page does not exist (or moved).',
	},
};
