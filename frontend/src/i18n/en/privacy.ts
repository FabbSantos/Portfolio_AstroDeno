import type { Shape } from '../types';
import type { privacy as ptShape } from '../pt/privacy';

export const privacy: Shape<typeof ptShape> = {
	eyebrow: 'Privacy',
	title: 'Privacy policy',
	lead: 'This site has a contact form and nothing else. Here is, in plain language, what happens with what you send.',
	updated: 'Updated August 2026',
	contactLabel: 'Questions or requests:',
	sections: [
		{
			h: 'What I collect',
			p: [
				'Only what you fill in the form: name, email, message and — if you provide them — WhatsApp, company and timeline.',
				'Along with the message, the notification email I receive includes the page you came from, the referrer and UTM parameters (if any), plus the IP address and browser used to send it. That helps me understand where a contact came from and block spam.',
			],
		},
		{
			h: 'What for',
			p: [
				'To reply to your message. That is all.',
				'I never use your email for marketing unless you ask for it, and I do not sell, rent or share the list with anyone.',
			],
		},
		{
			h: 'Who processes it',
			p: [
				'Resend — sends the notification email (servers in the US).',
				'Google — the inbox where the message lands.',
				'Vercel — hosts the site and provides aggregated analytics, with no cookies and no personal identification.',
			],
		},
		{
			h: 'For how long',
			p: [
				'As long as the conversation lasts. After that, the message stays in my inbox like any other email.',
				'You can ask for deletion at any time — I will reply to confirm.',
			],
		},
		{
			h: 'Your rights',
			p: [
				'Under the LGPD (Brazilian data protection law) you have the right to access, correct and delete your data, and to know who it was shared with.',
				'To exercise any of them, just write to contato@fabbahiense.dev.',
			],
		},
		{
			h: 'Cookies',
			p: [
				'The site does not use tracking cookies or ad pixels.',
				'Vercel Web Analytics is aggregated and cookie-free. The only thing kept in your browser is the visit origin (UTM) for the session, to fill in the form — it disappears when you close the tab.',
			],
		},
	],
};
