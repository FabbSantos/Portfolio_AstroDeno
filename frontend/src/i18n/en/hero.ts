import type { Shape } from '../types';
import type { hero as ptShape } from '../pt/hero';

export const hero: Shape<typeof ptShape> = {
	headline: 'Websites, web systems and AI integrations — built by a senior engineer,',
	headlineAccent: 'no agency in between.',
	sub: "I'm Fabrício Bahiense. Since 2018 I've been shipping to production for real-estate developers, edtechs and startups — landing pages that generate leads, systems that hold up under load, AI inside the product you already have. You talk directly to me, from quote to deploy, and get a fixed scope, a date and code that's yours.",
	credential: '{role} · {location} · since {since}',
	proof: '{years} years · {products} products in production · I reply within {time}',
	showcase: {
		label: 'Featured projects',
		slide: 'Project {n} of {total}',
		goTo: 'Show {title}',
		prev: 'Previous project',
		next: 'Next project',
		pause: 'Pause auto-rotation',
		play: 'Resume auto-rotation',
	},
};
