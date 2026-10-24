import type { Shape } from '../types';
import type { clients as ptShape } from '../pt/clients';

export const clients: Shape<typeof ptShape> = {
	label: 'Números y clientes',
	logosLabel: 'Empresas con las que ya trabajé',
	stats: {
		years: 'años programando',
		products: 'productos en producción',
		clients: 'empresas atendidas',
		reply: 'para responder',
	},
};
