import type { Shape } from '../types';
import type { common as ptShape } from '../pt/common';

export const common: Shape<typeof ptShape> = {
	skip: 'Saltar al contenido principal',
	menu: 'Menú',
	language: 'Idioma',
	switchTo: 'Cambiar idioma',
	ctaContact: 'Pedir presupuesto',
	ctaContactShort: 'Hablar conmigo',
	ctaWhatsapp: 'Escríbeme por WhatsApp',
	ctaWork: 'Ver lo que ya entregué',
	ctaTemplates: 'Ver plantillas',
	replyIn: 'Respondo en {time}',
	from: 'desde',
	businessDays: 'días hábiles',
	days: 'días',
	openInNewTab: 'se abre en una pestaña nueva',
	viewProject: 'Ver proyecto',
	requestAccess: 'Pedir acceso',
	comingSoon: 'próximamente',
	live: 'En línea',
	archived: 'Archivado',
	beta: 'Beta',
	nda: 'NDA',
	offline: 'sitio fuera de línea',
	back: 'Volver',
	theme: {
		toDark: 'Apagar la luz (modo oscuro)',
		toLight: 'Encender la luz (modo claro)',
	},
};
