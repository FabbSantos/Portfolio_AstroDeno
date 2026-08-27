import type { Shape } from '../types';
import type { clients as ptShape } from '../pt/clients';

export const clients: Shape<typeof ptShape> = {
	label: 'Numbers and clients',
	logosLabel: "Companies I've built for",
	stats: {
		years: 'years coding',
		products: 'products in production',
		clients: 'companies served',
		reply: 'to reply',
	},
};
