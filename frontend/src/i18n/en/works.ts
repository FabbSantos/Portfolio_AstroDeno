import type { Shape } from '../types';
import type { works as ptShape } from '../pt/works';

export const works: Shape<typeof ptShape> = {
	eyebrow: 'Work',
	head1: 'What shipped to',
	head2: 'production.',
	lead: 'Own products and client work. No course exercises here — those live in the Lab.',
	all: 'See all work',
	listLabel: 'Products and cases in production',
};
