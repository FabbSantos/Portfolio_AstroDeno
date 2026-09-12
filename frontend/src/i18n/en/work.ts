/** /en/work — same keys as the PT dictionary (enforced by Shape). */
import type { Shape } from '../types';
import type { work as ptShape } from '../pt/work';

export const work: Shape<typeof ptShape> = {
	hero: {
		eyebrow: '{from} → {to} · years in production',
		head1: 'Real',
		head2: 'work.',
		lead: 'These are the projects I can show openly. There is more: some under NDA, some I chose not to publish. Want to hear about them? Write me.',
	},

	flagships: {
		eyebrow: 'Own products',
		head1: 'Things I',
		head2: 'shipped myself.',
		lead: 'Products I designed, built and maintain. Database to UI, nobody else to share the blame with.',
	},

	cases: {
		eyebrow: 'Cases',
		head1: 'Delivered for',
		head2: 'companies.',
		lead: 'Sites and systems that went to production for real clients, and what I did on each one.',
	},

	lab: {
		eyebrow: 'Lab',
		head1: 'Challenges and',
		head2: 'experiments.',
		lead: 'Small things I built to learn a stack, solve a code challenge or just for fun. None of this was for a client.',
		summary: 'Show {n} experiments',
	},

	card: {
		role: 'My role:',
		outcome: 'Outcome',
		thumbAlt: '{title}',
	},

	cta: {
		head1: 'Something like',
		head2: 'yours?',
		sub: "If so, let's talk. I reply within 24 business hours.",
	},
};
