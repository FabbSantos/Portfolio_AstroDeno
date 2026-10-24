import type { Shape } from '../types';
import type { testimonials as ptShape } from '../pt/testimonials';

export const testimonials: Shape<typeof ptShape> = {
	eyebrow: 'Testimonios',
	head1: 'Quienes ya me contrataron',
	head2: 'hablan por mí.',
	lead: 'Sin guion y sin edición. Es lo que dijeron los clientes con el proyecto ya en línea.',
	listLabel: 'Testimonios de clientes',
	quoteMark: 'Comillas',
};
