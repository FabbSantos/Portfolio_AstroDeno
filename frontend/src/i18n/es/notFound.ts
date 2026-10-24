import type { Shape } from '../types';
import type { notFound as ptShape } from '../pt/notFound';

export const notFound: Shape<typeof ptShape> = {
	eyebrow: 'Error 404',
	head1: 'Esta página',
	head2: 'no existe.',
	sub: 'Puede que el enlace haya cambiado de lugar. Los caminos más útiles están aquí abajo.',
	work: 'Ver trabajos',
	templates: 'Ver plantillas',
	contact: 'Hablar conmigo',
};
