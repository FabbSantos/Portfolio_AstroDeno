/** /es/work: same keys as the PT dictionary (enforced by Shape). */
import type { Shape } from '../types';
import type { work as ptShape } from '../pt/work';

export const work: Shape<typeof ptShape> = {
	hero: {
		eyebrow: '{from} → {to} · años en producción',
		head1: 'Trabajo',
		head2: 'de verdad.',
		lead: 'Estos son los proyectos que puedo mostrar abiertamente. Hay más: algunos bajo NDA, otros que preferí no publicar. ¿Quieres saber de ellos? Escríbeme.',
	},

	flagships: {
		eyebrow: 'Productos propios',
		head1: 'Cosas que',
		head2: 'lancé yo mismo.',
		lead: 'Productos que diseñé, construí y mantengo. De la base de datos a la interfaz, sin nadie con quien repartir la culpa.',
	},

	cases: {
		eyebrow: 'Casos',
		head1: 'Entregado a',
		head2: 'empresas.',
		lead: 'Sitios y sistemas que entraron en producción para clientes reales, y lo que hice en cada uno.',
	},

	lab: {
		eyebrow: 'Lab',
		head1: 'Retos y',
		head2: 'experimentos.',
		lead: 'Cosas pequeñas que hice para aprender un stack, resolver un reto técnico o solo por diversión. Nada de esto fue para un cliente.',
		summary: 'Ver {n} experimentos',
	},

	card: {
		role: 'Mi rol:',
		outcome: 'Resultado',
		thumbAlt: '{title}',
		packages: 'Paquetes',
	},

	cta: {
		head1: '¿Se parece',
		head2: 'al tuyo?',
		sub: 'Si es así, hablemos. Respondo en 24 horas hábiles.',
	},
};
