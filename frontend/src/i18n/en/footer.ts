import type { Shape } from '../types';
import type { footer as ptShape } from '../pt/footer';

export const footer: Shape<typeof ptShape> = {
	location: 'Rio de Janeiro',
	tagline: 'Senior software engineer. Websites, systems and AI, and you talk to the person who builds it.',
	navTitle: 'Navigation',
	contactTitle: 'Contact',
	email: 'Email',
	whatsapp: 'WhatsApp',
	copyright: '© {year} Fabrício Bahiense',
	madeWith: 'Built with Astro, hosted on Vercel',
};
