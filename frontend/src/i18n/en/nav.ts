import type { Shape } from '../types';
import type { nav as ptShape } from '../pt/nav';

export const nav: Shape<typeof ptShape> = {
	home: 'Home',
	services: 'Services',
	work: 'Work',
	templates: 'Templates',
	about: 'About',
	contact: 'Contact',
	privacy: 'Privacy',
	mainNav: 'Main navigation',
};
