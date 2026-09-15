/**
 * Template catalogue — shared by the home band, the gallery, the sales page
 * (/templates/<slug>) and the demo pages (/templates/<slug>/demo).
 */
import type { Bi } from './site';

export type TemplateKind = 'realestate' | 'saas' | 'agency' | 'shop' | 'clinic';

export interface TemplateMeta {
	slug: string;
	name: string;
	/** Second word of the name, rendered with the accent colour. */
	accent: string;
	kind: TemplateKind;
	cat: Bi;
	/** One-liner for cards. */
	desc: Bi;
	/** Longer lead for the sales page. */
	lead: Bi;
	/** Sections a buyer gets — sales page bullets. */
	sections: Bi<readonly string[]>;
	/** Price in BRL, rendered as "a partir de R$ 6.500". */
	priceFrom: number;
	/** Business days to deliver a customized copy. */
	days: number;
	/** Locale the demo is written in (demos are single-locale by design). */
	demoLocale: 'pt' | 'en';
	/** Gradient for placeholder tiles. */
	grad: string;
	/** Recently added: "Novo" chip on its card. Keep new templates first in the list so they lead the home band. */
	isNew?: boolean;
}

export const templates: TemplateMeta[] = [
	{
		slug: 'salvia',
		name: 'Sálvia',
		accent: 'Clínica',
		kind: 'clinic',
		cat: { pt: 'Saúde · Clínica', en: 'Health · Clinic' },
		desc: {
			pt: 'Landing de clínica: especialidades, agendamento pelo WhatsApp em dois toques e horário com "aberto agora".',
			en: 'Clinic landing: specialties, two-tap WhatsApp booking and live "open now" hours.',
		},
		lead: {
			pt: 'Landing enxuta pra clínica e consultório. O paciente escolhe a especialidade e o período e a mensagem sai pronta no WhatsApp. Equipe com registro, convênios, horário ao vivo e SEO local já configurado.',
			en: 'A lean landing for clinics and practices. Patients pick a specialty and a time of day and the WhatsApp message is ready to send. Team with registries, insurance, live opening hours and local SEO built in.',
		},
		sections: {
			pt: ['Hero editorial com horário ao vivo', 'Especialidades com foto no hover', 'Agendamento pelo WhatsApp', 'Equipe com registro', 'Convênios', 'O espaço', 'Perguntas frequentes', 'Como chegar e horários', 'Rodapé com responsável técnico'],
			en: ['Editorial hero with live hours', 'Specialties with hover photos', 'WhatsApp booking', 'Team with registries', 'Insurance plans', 'The space', 'FAQ', 'Directions and hours', 'Footer with medical director'],
		},
		priceFrom: 1000,
		days: 3,
		demoLocale: 'pt',
		grad: 'linear-gradient(135deg,#E4EDE6,#BCD4C3)',
		isNew: true,
	},
	{
		slug: 'mirante',
		name: 'Mirante',
		accent: 'Lançamento',
		kind: 'realestate',
		cat: { pt: 'Imobiliário · Conversão', en: 'Real estate · Conversion' },
		desc: {
			pt: 'Landing de lançamento imobiliário: formulário no hero, plantas, localização e cara de venda de verdade.',
			en: 'Real-estate launch landing: lead form in the hero, floor plans, location and the proper sales feel.',
		},
		lead: {
			pt: 'Landing de lançamento imobiliário no padrão BR. Faixa de números, galeria, plantas, mapa e formulário de alta intenção. Feita pra converter visita em call com corretor.',
			en: 'Brazilian-style real-estate launch landing. Numbers band, gallery, floor plans, location map and a high-intent lead form. Built to convert visits into scheduled tours.',
		},
		sections: {
			pt: ['Hero com formulário', 'Faixa de números', 'O empreendimento + lazer', 'Plantas', 'Localização', 'Condições', 'Formulário completo', 'Rodapé com CRECI/RI'],
			en: ['Hero with lead form', 'Numbers band', 'The project + amenities', 'Floor plans', 'Location', 'Payment terms', 'Full lead form', 'Legal footer'],
		},
		priceFrom: 6500,
		days: 3,
		demoLocale: 'pt',
		grad: 'linear-gradient(135deg,#F0E6D2,#D9B98E)',
	},
	{
		slug: 'stratus',
		name: 'Stratus',
		accent: 'SaaS',
		kind: 'saas',
		cat: { pt: 'SaaS · B2B', en: 'SaaS · B2B' },
		desc: {
			pt: 'Landing focada em conversão de trial. Pricing + FAQ inline.',
			en: 'Conversion-focused trial landing. Inline pricing + FAQ.',
		},
		lead: {
			pt: 'Landing focada em conversão para SaaS B2B: hero forte, prova social, features, pricing e FAQ inline.',
			en: 'Conversion-focused landing for B2B SaaS: strong hero, social proof, features, pricing and inline FAQ.',
		},
		sections: {
			pt: ['Hero + CTA de trial', 'Mock do produto', 'Logos', '6 features', 'Pricing (3 planos)', 'FAQ', 'CTA final', 'Rodapé'],
			en: ['Hero + trial CTA', 'Product mock', 'Logo wall', '6 features', 'Pricing (3 plans)', 'FAQ', 'Final CTA', 'Footer'],
		},
		priceFrom: 4200,
		days: 3,
		demoLocale: 'en',
		grad: 'linear-gradient(135deg,#FFE8DE,#FFD4C2)',
	},
	{
		slug: 'atelier',
		name: 'Atelier',
		accent: 'Studio',
		kind: 'agency',
		cat: { pt: 'Agência · Estúdio', en: 'Agency · Studio' },
		desc: {
			pt: 'Portfólio editorial. Grid de cases e processo numerado.',
			en: 'Editorial portfolio. Case grid and numbered process.',
		},
		lead: {
			pt: 'Portfólio editorial para estúdios e agências: grid de cases, processo numerado, muito respiro.',
			en: 'Editorial portfolio for studios and agencies: case grid, numbered process, lots of whitespace.',
		},
		sections: {
			pt: ['Hero editorial', 'Grid de 6 cases', 'Processo em 4 passos', 'Sobre o estúdio + números', 'Contato', 'Rodapé'],
			en: ['Editorial hero', '6-case grid', '4-step process', 'Studio + stats', 'Contact', 'Footer'],
		},
		priceFrom: 3500,
		days: 2,
		demoLocale: 'en',
		grad: 'linear-gradient(135deg,#E8E4FE,#D4CFFA)',
	},
	{
		slug: 'brava',
		name: 'Brava',
		accent: 'Drop',
		kind: 'shop',
		cat: { pt: 'E-commerce · Drop', en: 'E-commerce · Drop' },
		desc: {
			pt: 'Lançamento limitado. Countdown + lookbook + vitrine que leva pro seu checkout.',
			en: 'Limited drop. Countdown + lookbook + storefront that links to your checkout.',
		},
		lead: {
			pt: 'Lançamento limitado para e-commerce: countdown, vitrine de produtos, lookbook e newsletter. Os produtos apontam pro checkout que você já usa (Shopify, Nuvemshop, Yampi…).',
			en: 'Limited drop for e-commerce: countdown, product grid, lookbook and newsletter. Products link to the checkout you already use (Shopify, Nuvemshop, Yampi…).',
		},
		sections: {
			pt: ['Ticker', 'Hero + countdown', 'Vitrine (6 produtos)', 'Lookbook', 'História', 'Newsletter', 'Rodapé'],
			en: ['Ticker', 'Hero + countdown', 'Storefront (6 products)', 'Lookbook', 'Story', 'Newsletter', 'Footer'],
		},
		priceFrom: 4800,
		days: 3,
		demoLocale: 'en',
		grad: 'linear-gradient(135deg,#DCFCE7,#B8F5CB)',
	},
];

export const getTemplate = (slug: string) => templates.find((t) => t.slug === slug);
export const demoPath = (slug: string) => `/templates/${slug}/demo`;

export function formatBRL(n: number): string {
	return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(n);
}
