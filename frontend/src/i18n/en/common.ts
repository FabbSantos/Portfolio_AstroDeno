import type { Shape } from '../types';
import type { common as ptShape } from '../pt/common';

export const common: Shape<typeof ptShape> = {
	skip: 'Skip to main content',
	menu: 'Menu',
	language: 'Language',
	switchTo: 'Português',
	ctaContact: 'Get a quote',
	ctaContactShort: 'Get in touch',
	ctaWhatsapp: 'Message me on WhatsApp',
	ctaWork: "See what I've shipped",
	ctaTemplates: 'See templates',
	replyIn: 'I reply within {time}',
	from: 'from',
	businessDays: 'business days',
	days: 'days',
	openInNewTab: 'opens in a new tab',
	viewProject: 'View project',
	requestAccess: 'Request access',
	comingSoon: 'coming soon',
	live: 'Live',
	archived: 'Archived',
	beta: 'Beta',
	nda: 'NDA',
	offline: 'site offline',
	back: 'Back',
	theme: {
		toDark: 'Turn the light off (dark mode)',
		toLight: 'Turn the light on (light mode)',
	},
};
