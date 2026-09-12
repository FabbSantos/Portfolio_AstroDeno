import type { Shape } from '../types';
import type { hero as ptShape } from '../pt/hero';

export const hero: Shape<typeof ptShape> = {
	headline: 'Need a website, a web system or AI inside your product?',
	headlineAccent: 'I build it.',
	sub: "I'm Fabrício, a software engineer since 2018. I've shipped for real-estate developers, edtechs and startups. You talk to me from quote to deploy: fixed scope, an agreed date, and the code stays yours.",
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
