import type { Shape } from '../types';
import type { footer as ptShape } from '../pt/footer';

export const footer: Shape<typeof ptShape> = {
	location: 'Río de Janeiro',
	tagline: 'Ingeniero de software sénior. Sitios, sistemas e IA, y tú hablas directo con quien los hace.',
	navTitle: 'Navegación',
	contactTitle: 'Contacto',
	email: 'Correo',
	whatsapp: 'WhatsApp',
	copyright: '© {year} Fabrício Bahiense',
	madeWith: 'Hecho con Astro, alojado en Vercel',
};
