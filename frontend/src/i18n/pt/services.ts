/**
 * Home "Serviços" — five compact cards + the hover preview panel.
 * Per-service copy (titles, one-liners, outcomes, chips) lives in src/data/services.ts.
 * Placeholders: {label} = preview label ("Mirante Lançamento").
 */
export const services = {
	eyebrow: 'Serviços',
	head1: 'O que eu faço',
	head2: 'por você.',
	lead: 'Passa o mouse ou toca em cada serviço: tem um template ou produto pronto que resolve o problema.',
	forWhom: 'Pra quem',
	outcome: 'Você recebe',
	timeline: 'Prazo',
	price: 'Investimento',

	listLabel: 'Serviços',
	scrollPrev: 'Serviço anterior',
	scrollNext: 'Próximo serviço',
	panelLabel: 'Prévia do template ou produto que resolve o serviço',
	solvesWith: 'Resolve com:',
	viewTemplate: 'Ver template',
	viewProduct: 'Ver produto',
	previewAlt: 'Prévia de {label}',
} as const;
