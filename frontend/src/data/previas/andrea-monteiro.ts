/**
 * Prévia: Andréa Monteiro Coiffeur (hair stylist, Méier, Rio de Janeiro).
 * Página em /previas/andrea-monteiro.
 *
 * Só o conteúdo que a cliente / o briefing deu. Nada inventado.
 *
 * Fotos: as reais da cliente, em public/previas/andrea-monteiro/:
 * hero (ela no studio), trabalho-1…3 (resultados), cuidado (recepção),
 * mural-1 (ela na cadeira, no mural de avaliações) e servico-1…6 (posts de
 * serviço do Instagram).
 * Arquivo que faltar some do layout.
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

	/** Serviços dos posts dela, na faixa que passa embaixo do hero. */
	highlights: ['Lifting Cachos', 'Terapia Capilar', 'Lifting Hair', 'Corte Terapêutico', 'Corte Visagista', 'Corte em Cacheado'],
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
	/** Texto escrito em cada post de serviço (servico-1 … servico-6), transcrito para o texto alternativo. */
	servicePosts: [
		'Lifting Cachos. Desenvolvido especialmente para cabelos cacheados! Ele é feito a partir de um mapeamento das áreas mais “inchadas” ou com frizz ao redor da cabeça. O tratamento é aplicado de forma localizada, respeitando o formato dos cachos. Resultado: volume controlado onde precisa, sem perder definição.',
		'Terapia Capilar. Um cuidado profundo e individualizado para o couro cabeludo e os fios. Trabalhamos desde a raiz, tratando oleosidade, queda, caspa, afinamento e ressecamento, com protocolos personalizados e ativos naturais.',
		'Lifting Hair. Um tratamento intensivo de nutrição e brilho. O lifting sela os fios, recupera o toque macio e combate o ressecamento, deixando o cabelo mais leve, alinhado e com movimento.',
		'Corte Terapêutico. É um corte suave, feito apenas para “limpar” as pontas, respeitando o crescimento e o tratamento do fio. Ideal para quem está cuidando do cabelo e não quer tirar comprimento, mas precisa manter a saúde capilar em dia.',
		'Corte Visagista. Corte que trata, não só transforma. Cortar o cabelo vai além da estética. Um bom corte remove pontas danificadas, ajuda no crescimento saudável e valoriza o formato dos fios.',
		'Corte em Cacheado. O cabelo cacheado precisa de camadas bem distribuídas para ganhar forma, definição e leveza. Um corte em camadas realça o movimento natural, evita o efeito “abajur” e dá aquele acabamento bonito que valoriza cada cacho.',
	],
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
