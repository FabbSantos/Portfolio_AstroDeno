import type { Shape } from '../types';
import type { services as ptShape } from '../pt/services';

export const services: Shape<typeof ptShape> = {
	eyebrow: 'Services',
	head1: 'What I do',
	head2: 'for you.',
	lead: 'Hover or tap a card: every service has a ready-made template or product that solves the problem.',
	forWhom: 'Who it’s for',
	outcome: 'You get',
	timeline: 'Timeline',
	price: 'Investment',

	listLabel: 'Services',
	scrollPrev: 'Previous service',
	scrollNext: 'Next service',
	panelLabel: 'Preview of the template or product that solves the service',
	solvesWith: 'Solved with:',
	viewTemplate: 'View template',
	viewProduct: 'View product',
	previewAlt: 'Preview of {label}',
	examples: 'Examples',
	example: 'example',
	exampleOf: '{n} of {total}: {label}',
	goTo: 'Show {label}',
	pause: 'Pause the examples',
	play: 'Resume the examples',
};
