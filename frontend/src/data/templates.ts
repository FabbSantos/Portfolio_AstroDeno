/**
 * Template catalogue — shared by the home Templates section, the gallery page
 * and each template page (for "related"). Card copy (cat/desc) is translated
 * via i18n keys; names/price are language-neutral.
 */
export type TemplateKind = 'saas' | 'agency' | 'shop' | 'realestate' | 'event' | 'cv' | 'app' | 'longform';

export interface TemplateMeta {
	slug: string;
	/** name split so the second part can carry the accent emphasis */
	name: string;
	accent: string;
	catKey: string;
	descKey: string;
	price: string;
	days: number;
	/** gradient for the preview tile */
	grad: string;
	/** layout family used by the live wireframe preview */
	kind: TemplateKind;
}

export const templates: TemplateMeta[] = [
	{
		slug: 'mirante',
		name: 'Mirante',
		accent: 'Lançamento',
		catKey: 'tpl.mirante.cat',
		descKey: 'tpl.mirante.desc',
		price: 'R$ 6.500+',
		days: 3,
		grad: 'linear-gradient(135deg,#F0E6D2,#D9B98E)',
		kind: 'realestate',
	},
	{
		slug: 'stratus',
		name: 'Stratus',
		accent: 'SaaS',
		catKey: 'tpl.stratus.cat',
		descKey: 'tpl.stratus.desc',
		price: 'R$ 4.200+',
		days: 3,
		grad: 'linear-gradient(135deg,#FFE8DE,#FFD4C2)',
		kind: 'saas',
	},
	{
		slug: 'atelier',
		name: 'Atelier',
		accent: 'Studio',
		catKey: 'tpl.atelier.cat',
		descKey: 'tpl.atelier.desc',
		price: 'R$ 3.500+',
		days: 2,
		grad: 'linear-gradient(135deg,#E8E4FE,#D4CFFA)',
		kind: 'agency',
	},
	{
		slug: 'brava',
		name: 'Brava',
		accent: 'Drop',
		catKey: 'tpl.brava.cat',
		descKey: 'tpl.brava.desc',
		price: 'R$ 4.800+',
		days: 3,
		grad: 'linear-gradient(135deg,#DCFCE7,#B8F5CB)',
		kind: 'shop',
	},
];

export const getTemplate = (slug: string) => templates.find((t) => t.slug === slug);
