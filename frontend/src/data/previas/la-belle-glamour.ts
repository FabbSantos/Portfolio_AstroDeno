/**
 * Prévia: LA BELLE GLAMOUR concept (salão de beleza, Méier, Rio de Janeiro).
 * Página em /previas/la-belle-glamour.
 *
 * Só o conteúdo do briefing. Nada inventado.
 *
 * Fotos e vídeo, em public/previas/la-belle-glamour/ (originais guardados fora
 * do projeto, em Downloads/la-belle-glamour-originais):
 * hero.mp4 (montagem em câmera lenta do vídeo do salão, vertical, celular) e
 * hero-wide.mp4 (a mesma montagem em três faixas, computador), cada um com o
 * primeiro quadro em .webp; logo.svg (a logo dela vetorizada, em dourado
 * claro pra ficar sobre o vídeo); trabalho-1…5 (resultados de cabelo),
 * studio-1…3 (a porta, a equipe, a fachada); hero-2 (unhas) só entra no topo
 * em colagem.
 *
 * Fonte: a da logo é paga (não dá pra usar na web); os títulos usam a
 * Cormorant, a gratuita mais próxima. As letras dela ficam na logo do topo.
 *
 * Serviços: os 8 nomes da arte de serviços dela, sem descrição (a arte não
 * tem). Avaliações: fixas, cada frase uma vez (sem faixa passando).
 */
import type { PreviaData, PreviaTheme } from './types';

/** Duas paletas. Para trocar, mude `theme` lá embaixo. */
export const palettes = {
	/** A · Rosa antigo, nude e dourado: as cores da logo e da arte dela. */
	rosaAntigo: { accent: '#b46a7d', accent2: '#c9a46a', bg: '#f8f1ec', bg2: '#efdfd2', ink: '#3b2a2e', radius: 0 },
	/** B · Bege e rosa da fachada: o bege #dbb89d e o rosa dos balões #ff5dab. */
	begeRosa: { accent: '#ff5dab', accent2: '#dbb89d', bg: '#fbf4ef', bg2: '#f1e2d5', ink: '#2e2226', radius: 0 },
} satisfies Record<string, PreviaTheme>;

const previa: PreviaData = {
	slug: 'la-belle-glamour',
	theme: palettes.rosaAntigo,
	display: 'cormorant',
	heroLayout: 'cover',

	name: 'La Belle Glamour Concept',
	line: 'Salão de beleza no Méier',
	seo: {
		title: 'La Belle Glamour Concept',
		description: 'Salão de beleza no Méier',
	},
	whatsapp: {
		number: '5521972946068',
		message: 'Oi! Vi o site e quero agendar um horário.',
		label: 'Agendar pelo WhatsApp',
		short: 'Agendar',
	},
	instagram: 'https://www.instagram.com/labelleglamour.oficial',
	rating: { value: '5,0', count: '160 avaliações', source: 'Google' },
	labels: { work: 'Trabalhos', services: 'Serviços', reviews: 'Avaliações', hours: 'Horários', studio: 'Espaço' },

	services: ['Cabelos', 'Terapia Capilar', 'Mega Hair', 'Unhas', 'Sobrancelhas', 'Estética', 'Massagens', 'Maquiagem & Penteados'],
	reviews: ['Melhor salão do Méier.', 'Sou cliente há alguns anos e não troco por outro.', 'Ambiente aconchegante, profissionais competentes e muito simpáticas.'],
	reviewsLayout: 'still',

	location: {
		address: { street: 'R. Dias da Cruz, 188, subsolo, loja I', district: 'Méier', city: 'Rio de Janeiro', state: 'RJ' },
		timezone: 'America/Sao_Paulo',
		hours: [{ days: ['tue', 'wed', 'thu', 'fri', 'sat'], opens: '09:00', closes: '19:00' }],
		mapsLabel: 'Como chegar',
	},
};

export default previa;
