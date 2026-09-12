/** /en/about — same keys as the PT dictionary (enforced by Shape). */
import type { Shape } from '../types';
import type { about as ptShape } from '../pt/about';

export const about: Shape<typeof ptShape> = {
	hero: {
		eyebrow: 'About',
		head1: 'About',
		head2: 'me.',
		since: 'since {year}',
		lead: "My name is Fabrício Bahiense, from Rio de Janeiro. I started as a technical student at CEFET/RJ, interned in 2018 and haven't stopped shipping since. Here's the honest summary.",
	},

	stats: {
		years: 'years in production',
		products: 'products live',
		clients: 'companies and clients',
		response: 'response time',
	},

	story: {
		quote: 'Code is only half the job. The other half is understanding the problem before writing the first line.',
		by: 'Fabrício',
		p1: 'I started studying development back in school, then took my first internship as a full-stack dev. The standard combo of the time: PHP, jQuery, MySQL.',
		p2: 'From there I moved through agencies and consultancies as a frontend and full-stack engineer, working with React, Vue, Next and Node, until I grew into technical leadership.',
		p3: "Today I work as a senior software engineer on high-impact web platforms, and I still take on projects of my own, because that's where I learn the most.",
		human: 'Father, husband, problem solver. Many layers, like an onion. I love football, music, games, beer, science, astronomy and, of course, technology.',
	},

	career: {
		eyebrow: 'Path',
		head1: 'From intern',
		head2: 'to senior.',
		lead: 'A few roles, a handful of stacks, one principle: software that ships and stays standing.',
		current: 'now',
		rows: [
			{
				period: '2016 to 2019',
				role: 'Technical degree · CEFET/RJ',
				desc: 'High school + computer-science technical degree. Started programming out of curiosity.',
				tags: ['HTML', 'JS', 'PHP'],
			},
			{
				period: '2018 to 2019',
				role: 'Full-stack intern',
				desc: 'First job: institutional sites, forms, simple integrations.',
				tags: ['PHP', 'jQuery', 'MySQL'],
			},
			{
				period: '2020 to 2022',
				role: 'Frontend · MKT4Edu',
				desc: 'Landing pages and marketing campaigns at volume. HubSpot + React.',
				tags: ['HubSpot', 'React', 'HTML'],
			},
			{
				period: '2022 to 2024',
				role: 'Frontend / Full stack · BJ Consulting',
				desc: 'Diverse clients. Mostly Astro; Qwik when it made sense.',
				tags: ['Astro', 'Qwik', 'TypeScript'],
			},
			{
				period: 'Aug 24 to Jan 25',
				role: 'Product Lead · LocalApp / Lumina Lab',
				desc: 'AI-product startup. Led Eleodora, an agent with a personality, built to sound like the client who would hire it.',
				tags: ['AI', 'LLM', 'React'],
			},
			{
				period: 'Jan 25 to May 25',
				role: 'Tech Lead · Nexus Comunicação',
				desc: 'Multichannel platform (SMS, WhatsApp, RCS): customer dashboard, Node API, Redis queues, AWS/Lightsail infra. Vue + Nuxt + Astro + Next.',
				tags: ['Vue', 'Nuxt', 'Node', 'AWS'],
			},
			{
				period: 'May 25 to today',
				role: 'Senior Specialist · NTT Data',
				desc: 'Senior full stack at the largest bank in Latin America.',
				tags: ['C#', 'AWS', 'DevOps'],
			},
		],
	},

	how: {
		eyebrow: 'How I work',
		head1: 'No surprises',
		head2: 'halfway through.',
		lead: 'Four rules that apply to every project, from the one-week template to the six-month system.',
		principles: [
			{
				title: 'Fixed scope per phase',
				desc: "You know what's in, what's out and what it costs before the first line. Changed your mind? We scope the next phase, with no redoing the math on the previous one.",
			},
			{
				title: 'A preview every week',
				desc: "Every week you get a link to see the project exactly as it stands. No disappearing for a month and coming back with a surprise.",
			},
			{
				title: 'The code is yours',
				desc: 'Repository on your GitHub from day 1. Want to switch developers tomorrow? The project goes with you, documented, no strings attached.',
			},
			{
				title: 'No middleman',
				desc: 'You talk to me. The person who quotes, the person who codes and the person who answers your message are the same one.',
			},
		],
		availabilityLabel: 'Availability',
		format: 'Fixed-scope projects or a monthly block of hours.',
	},

	stack: {
		label: 'Everyday stack',
		line: 'TypeScript · React · Vue · Next · Nuxt · Astro · Node · C# · AWS · Redis · Postgres',
	},

	cta: {
		head1: 'Like what you see?',
		head2: "Let's talk.",
		sub: 'I reply within 24 business hours. You talk directly to me.',
	},
};
