import type { Shape } from '../types';
import type { contact as ptShape } from '../pt/contact';

export const contact: Shape<typeof ptShape> = {
	eyebrow: 'Contact',
	head1: 'Tell me the problem.',
	head2: "Within 24 business hours I'll tell you if it's doable, what it costs and when it's ready.",
	sub: "You talk to me directly, not to a sales rep. Send a short summary (or just a link to what exists today) and I'll come back with questions or a proposal.",

	form: {
		name: 'Name',
		email: 'Email',
		whatsapp: 'WhatsApp',
		company: 'Company',
		optional: 'optional',
		need: 'What do you need',
		needGroupServices: 'Services',
		needGroupTemplates: 'Templates',
		needGroupOther: 'Other',
		needTemplate: 'Template: {name}',
		needTemplateAny: 'A template (still deciding which)',
		needPulsar: 'Access to Pulsar',
		needQuasar: 'Access to Quasar',
		needOther: 'Something else',
		deadline: 'Timeline',
		deadlineAny: 'Not sure yet',
		deadlineWeek: 'This week',
		deadlineMonth: 'Within 30 days',
		deadlineQuarter: '1 to 3 months',
		deadlineFlexible: 'No rush',
		message: 'Message',
		messagePlaceholder: 'What you need, what exists today and a link, if you have one.',
		templatePrefill: "Hi! I'd like to talk about the {name} template.",
		sending: 'Sending…',
	},

	lgpd: {
		before: 'By sending, you agree to the ',
		link: 'Privacy Policy',
		after: '. I only use your data to reply to you.',
	},
	or: 'or write directly to',

	success: {
		title: 'Got it, {name}!',
		body: "I reply within 24 business hours. If it's urgent, WhatsApp.",
		bodyNoWhatsapp: 'I reply within 24 business hours.',
		linkedin: 'Find me on LinkedIn',
	},

	errors: {
		BOT: 'The anti-spam check failed. Reload the page and try again.',
		RATE_LIMITED: 'Too many attempts in a short time. Wait a few minutes or send an email.',
		SEND_FAILED: "The email service didn't respond. Try again in a moment or email me directly.",
		NOT_CONFIGURED: 'The form is temporarily down. Send an email and I will reply just the same.',
		generic: "Couldn't send. Check the fields and try again, or send an email.",
		mailto: 'Send by email',
		mailSubject: 'Contact from the site. {need}',
	},

	faq: {
		title: 'Quick questions',
		items: [
			{
				q: 'How long does it take?',
				a: 'Template: 3 to 5 business days after the briefing. Custom: from 2 weeks, with a preview every week.',
			},
			{
				q: 'How does payment work?',
				a: 'Part on acceptance, part on delivery. Bank transfer or invoice, always with a receipt.',
			},
			{
				q: 'Who does the work?',
				a: "Me. No subcontracting, no hidden junior: the person you talk to is the person writing the code.",
			},
			{
				q: 'And after the deploy?',
				a: '3 months of adjustments included. After that, optional monthly maintenance, or the repo is yours and you continue with whoever you like.',
			},
		],
	},

	social: {
		title: 'Social',
		github: 'GitHub',
		linkedin: 'LinkedIn',
		instagram: 'Instagram',
	},
};
