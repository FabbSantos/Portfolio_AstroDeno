/**
 * Type-level smoke test for the core schema — never executed, only checked by
 * `astro check`. Keeps `defineSite` / `BaseSite` honest against a real config
 * with an imported image.
 */
import mirante from '../../assets/featured/mirante.png';
import { baseSiteSchema, defineSite, type BaseSite, type BaseSiteInput, type LeadField } from './schema';

export function _smokeSite(): BaseSite {
	const input: BaseSiteInput = {
		brand: { name: 'Smoke Co.', tagline: 'Só para o type-check', logo: mirante, locale: 'pt-BR' },
		theme: { accent: '#ff5964', accent2: '#7c3aed', bg: '#fbfbfd', ink: '#1a1a1c', radius: 12 },
		seo: {
			title: 'Smoke Co. — teste',
			description: 'Config de exemplo usada só para o astro check.',
			canonical: 'https://example.com',
			ogImage: mirante,
			jsonLd: { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Smoke Co.' },
		},
		contact: {
			whatsapp: { number: '5511999998888', message: 'Olá! Vim pelo site.' },
			phone: '(11) 99999-8888',
			email: 'contato@example.com',
			form: { provider: 'whatsapp', successUrl: '/obrigado' },
		},
		analytics: { ga4: 'G-XXXXXXX' },
		legal: { privacyUrl: '/privacidade', company: 'Smoke Co. Ltda.', cnpj: '00.000.000/0001-00' },
		nav: [{ label: 'Início', href: '#top' }],
	};

	const site = defineSite(baseSiteSchema, input);

	// Defaults resolved by the schema must be present in the output type.
	const radius: number = site.theme.radius;
	const provider: BaseSite['contact']['form']['provider'] = site.contact.form.provider;
	const logo: ImageMetadata | null = site.brand.logo;
	void radius;
	void provider;
	void logo;

	return site;
}

export const _smokeFields: LeadField[] = [
	{ name: 'name', label: 'Nome', type: 'text', required: true, autocomplete: 'name' },
	{ name: 'phone', label: 'WhatsApp', type: 'tel', required: true },
	{ name: 'interest', label: 'Interesse', type: 'select', options: ['Comprar', 'Alugar'], placeholder: 'Escolha' },
	{ name: 'message', label: 'Mensagem', type: 'textarea' },
];
