import type { Shape } from '../types';
import type { testimonials as ptShape } from '../pt/testimonials';

export const testimonials: Shape<typeof ptShape> = {
	eyebrow: 'Testimonials',
	head1: 'People who hired me',
	head2: 'say it best.',
	lead: 'No script and no editing. This is what clients said after the project went live.',
	listLabel: 'Client testimonials',
	quoteMark: 'Quote mark',
};
