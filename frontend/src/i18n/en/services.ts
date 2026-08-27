import type { Shape } from '../types';
import type { services as ptShape } from '../pt/services';

export const services: Shape<typeof ptShape> = {
	eyebrow: 'Services',
	head1: 'What I do',
	head2: 'for you.',
	lead: "Fixed scope, a deadline and code that's yours. Pick what looks like your problem — we fine-tune it when we talk.",
	forWhom: 'Who it’s for',
	outcome: 'You get',
	timeline: 'Timeline',
	price: 'Investment',
};
