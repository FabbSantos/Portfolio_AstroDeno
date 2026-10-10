/**
 * Prévia: Andréa Monteiro Coiffeur (hair stylist, Méier, Rio de Janeiro).
 * Página em /previas/andrea-monteiro.
 *
 * Só o conteúdo que a cliente / o briefing deu. Nada inventado.
 *
 * Fotos: as reais da cliente, em public/previas/andrea-monteiro/
 * hero.jpg, servicos.jpg, cuidado.jpg e trabalho-1.jpg … trabalho-6.jpg em
 * retrato; faixa.jpg em paisagem larga. Hoje são placeholders: troque os
 * arquivos mantendo os nomes. Arquivo que faltar some do layout.
 */
import type { PreviaData, PreviaTheme } from './types';

/** Duas paletas quentes. Para trocar, mude `theme` lá embaixo. */
export const palettes = {
	/** A · Cobre e creme: papel creme, tinta café, cobre queimado. */
	cobre: { accent: '#a8562f', accent2: '#dcbb9a', bg: '#f6efe6', bg2: '#ece1d3', ink: '#2a1f1a', radius: 0 },
	/** B · Rosé e vinho: papel rosado, tinta ameixa, vinho. */
	rose: { accent: '#8c3b4a', accent2: '#dba9a1', bg: '#f8efeb', bg2: '#f0dfd9', ink: '#2b1a1d', radius: 0 },
} satisfies Record<string, PreviaTheme>;

const previa: PreviaData = {
	slug: 'andrea-monteiro',
	theme: palettes.cobre,

	name: 'Andréa Monteiro Coiffeur',
	line: 'Hair stylist no Méier há mais de 25 anos',
	seo: {
		title: 'Andréa Monteiro Coiffeur',
		description: 'Hair stylist no Méier há mais de 25 anos',
	},
	whatsapp: {
		number: '5521982849386',
		message: 'Oi Andréa! Vi seu site e quero agendar um horário.',
		label: 'Agendar pelo WhatsApp',
		short: 'Agendar',
	},
	rating: { value: '5,0', count: '91 avaliações', source: 'Google' },
	labels: { work: 'Trabalhos', services: 'Serviços', reviews: 'Avaliações', hours: 'Horários' },

	services: ['Corte feminino e masculino', 'Coloração e mechas', 'Tratamentos e hidratação', 'Escova e finalização'],
	care: {
		title: 'Como eu cuido do seu cabelo',
		steps: [
			{ t: 'Escuta', d: 'Antes da tesoura, a conversa.' },
			{ t: 'Diagnóstico', d: 'Cada tipo de cabelo pede um cuidado.' },
			{ t: 'Transformação', d: 'Corte, cor ou tratamento, explicado passo a passo.' },
			{ t: 'Cuidado em casa', d: 'Você sai sabendo como manter.' },
		],
	},
	reviews: ['Sou cliente há 26 anos.', 'Frequento o Studio há mais de 25 anos.', 'Dá atenção, explica cada detalhe do serviço.'],

	location: {
		address: { street: 'R. Dias da Cruz, 496, sala 102', district: 'Méier', city: 'Rio de Janeiro', state: 'RJ' },
		timezone: 'America/Sao_Paulo',
		hours: [
			{ days: ['tue', 'wed'], opens: '10:00', closes: '17:00' },
			{ days: ['thu', 'fri'], opens: '07:30', closes: '21:00' },
			{ days: ['sat'], opens: '07:30', closes: '14:00' },
		],
		mapsLabel: 'Como chegar',
	},
};

export default previa;
