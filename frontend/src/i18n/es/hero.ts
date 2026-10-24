import type { Shape } from '../types';
import type { hero as ptShape } from '../pt/hero';

export const hero: Shape<typeof ptShape> = {
	headline: '¿Necesitas un sitio web, un sistema o una IA en tu producto?',
	headlineAccent: 'Yo lo hago.',
	sub: 'Soy Fabrício, ingeniero de software desde 2018. Ya entregué productos para constructoras, edtechs y startups. Aquí hablas conmigo desde el presupuesto hasta el deploy: alcance cerrado, plazo acordado y el código se queda contigo.',
	credential: '{role} · {location} · desde {since}',
	proof: '{years} años · {products} productos en producción · respondo en {time}',
	showcase: {
		label: 'Proyectos destacados',
		slide: 'Proyecto {n} de {total}',
		goTo: 'Mostrar {title}',
		open: 'Abrir {title}',
		prev: 'Proyecto anterior',
		next: 'Proyecto siguiente',
		pause: 'Pausar la rotación automática',
		play: 'Reanudar la rotación automática',
	},
};
