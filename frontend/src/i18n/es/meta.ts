import type { Shape } from '../types';
import type { meta as ptShape } from '../pt/meta';

export const meta: Shape<typeof ptShape> = {
	siteName: 'Fabrício Bahiense',
	home: {
		title: 'Fabrício Bahiense: sitios, sistemas e IA de un ingeniero sénior',
		description:
			'Ingeniero de software sénior en Río. Landing pages que generan leads, sistemas web que aguantan volumen e IA en tu producto. Plantillas listas en 3 a 5 días.',
	},
	about: {
		title: 'Sobre mí · Fabrício Bahiense',
		description:
			'Ingeniero de software sénior desde 2018: de PHP a React, Vue, Astro, Node y C# en AWS. Tech Lead de la plataforma multicanal de Nexus. Cómo trabajo y disponibilidad.',
	},
	work: {
		title: 'Trabajos · Fabrício Bahiense',
		description:
			'Casos en producción: plataforma multicanal (SMS, WhatsApp, RCS), sitios de lanzamientos inmobiliarios para Conx y Passareli, productos propios Pulsar y Quasar.',
	},
	templates: {
		title: 'Plantillas listas en 3 a 5 días · Fabrício Bahiense',
		description:
			'Seis estructuras de sitio que escribí yo mismo: citas, menú, captación, producto con planes, portafolio y vitrina. Sirven para clínica, salón, tienda, oficina o lo que sea tu negocio. Tú eliges, yo personalizo y publico en tu dominio.',
	},
	templateDetail: {
		title: '{name} · plantilla · Fabrício Bahiense',
		description: '{lead}',
	},
	privacy: {
		title: 'Política de privacidad · Fabrício Bahiense',
		description: 'Qué datos recopila el formulario de contacto, para qué, por cuánto tiempo y cómo pedir su eliminación.',
	},
	notFound: {
		title: 'Página no encontrada · Fabrício Bahiense',
		description: 'Esta página no existe (o cambió de lugar).',
	},
};
