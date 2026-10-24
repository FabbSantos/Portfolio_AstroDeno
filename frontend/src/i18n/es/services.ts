import type { Shape } from '../types';
import type { services as ptShape } from '../pt/services';

export const services: Shape<typeof ptShape> = {
	eyebrow: 'Servicios',
	head1: 'Lo que hago',
	head2: 'por ti.',
	lead: 'Pasa el mouse o toca cada servicio: hay una plantilla o un producto listo que resuelve el problema.',
	forWhom: 'Para quién',
	outcome: 'Recibes',
	timeline: 'Plazo',
	price: 'Inversión',

	listLabel: 'Servicios',
	scrollPrev: 'Servicio anterior',
	scrollNext: 'Servicio siguiente',
	panelLabel: 'Vista previa de la plantilla o el producto que resuelve el servicio',
	solvesWith: 'Se resuelve con:',
	viewTemplate: 'Ver plantilla',
	viewProduct: 'Ver producto',
	viewService: 'Ver el servicio',
	previewAlt: 'Vista previa de {label}',
	examples: 'Ejemplos',
	example: 'ejemplo',
	exampleOf: '{n} de {total}: {label}',
	goTo: 'Mostrar {label}',
	pause: 'Pausar el cambio de ejemplos',
	play: 'Reanudar el cambio de ejemplos',
};
