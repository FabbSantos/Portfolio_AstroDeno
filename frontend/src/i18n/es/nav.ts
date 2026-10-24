import type { Shape } from '../types';
import type { nav as ptShape } from '../pt/nav';

export const nav: Shape<typeof ptShape> = {
	home: 'Inicio',
	services: 'Servicios',
	work: 'Trabajos',
	templates: 'Plantillas',
	about: 'Sobre mí',
	contact: 'Contacto',
	privacy: 'Privacidad',
	mainNav: 'Navegación principal',
};
