/**
 * Depoimentos de clientes (#depoimentos na home).
 *
 * A seção só aparece quando este array tem pelo menos um item. Vazio = nada
 * renderiza, sem placeholder. Com 4 ou mais, o marquee vira duas fileiras.
 *
 * Como adicionar um depoimento:
 *   1. `quote` em PT e EN (a tradução pode ser sua, mas avisa a pessoa).
 *   2. `name`, `role` (PT e EN) e `company` como a pessoa quer aparecer.
 *   3. Opcional: `href` (site ou LinkedIn da empresa), `avatar` e `logo`
 *      importados de src/assets/testimonials/ (foto quadrada, 96px basta).
 *      Sem avatar, o card mostra as iniciais num tile colorido.
 *
 * Só depoimento real, com autorização da pessoa. Nada inventado.
 */
import type { ImageMetadata } from 'astro';
import type { Bi } from './site';

export interface Testimonial {
	id: string;
	quote: Bi;
	name: string;
	role: Bi;
	company: string;
	href?: string;
	avatar?: ImageMetadata;
	logo?: ImageMetadata;
}

// TODO(fab): pedir depoimentos pra Conx/Passareli, Nexus e Mkt4Edu
export const TESTIMONIALS: Testimonial[] = [];
