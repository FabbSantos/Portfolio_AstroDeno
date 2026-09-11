/**
 * Single place for everything "about the business" that shows up in the UI.
 * Bilingual values are `{ pt, en }` objects — pick with `pick(value, locale)`.
 *
 * Fields marked TODO(fab) are decisions only you can make; the UI degrades
 * gracefully while they are empty (e.g. no WhatsApp number = no WhatsApp button).
 */
export type Bi<T = string> = { pt: T; en: T };

export const SITE = {
	name: 'Fabrício Bahiense',
	shortName: 'Fab Bahiense',
	brand: { first: 'Fab', dot: '.', last: 'Bahiense' },
	url: 'https://www.fabbahiense.dev',
	email: 'contato@fabbahiense.dev',
	/** Where contact-form leads are delivered (server-side; overridable by CONTACT_TO env). */
	leadInbox: 'fabriciobs2000@gmail.com',

	/** TODO(fab): número no formato internacional, só dígitos (ex.: '5521999998888').
	 *  Vazio = todos os botões de WhatsApp ficam escondidos automaticamente. */
	whatsapp: {
		number: '+5521968240663',
		message: {
			pt: 'Oi Fabrício! Vi seu site e quero conversar sobre um projeto.',
			en: "Hi Fabrício! I saw your site and I'd like to talk about a project.",
		} as Bi,
	},

	location: { pt: 'Rio de Janeiro, BR', en: 'Rio de Janeiro, BR' } as Bi,
	role: { pt: 'Engenheiro de software sênior', en: 'Senior software engineer' } as Bi,
	since: 2018,
	responseTime: { pt: '24h úteis', en: '24 business hours' } as Bi,

	/** TODO(fab): uma frase honesta de capacidade (formato/horas). Substitui
	 *  "Aberto a projetos selecionados" e "aceito quantos clientes vierem". */
	availability: {
		pt: 'Pode me chamar que a gente resolve!',
		en: "Send a message, I'll solve your problem!",
	} as Bi,

	stats: {
		years: '8+',
		products: '20+',
		clients: '10+',
	},

	social: {
		github: 'https://github.com/FabbSantos',
		linkedin: 'https://www.linkedin.com/in/fabricio-b-santos/',
		instagram: 'https://www.instagram.com/fabbahiense_',
	},

	/** Delivery promises shared by templates + custom work. Keep them true. */
	promises: {
		templateDays: '3–5',
		adjustmentsMonths: 3,
	},
} as const;

/** wa.me deep link, or null when no number is configured. */
export function whatsappUrl(locale: 'pt' | 'en', text?: string): string | null {
	// wa.me wants digits only (no '+', spaces or dashes) — tolerate any formatting in SITE.
	const digits = SITE.whatsapp.number.replace(/\D/g, '');
	if (!digits) return null;
	const msg = text ?? SITE.whatsapp.message[locale];
	return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}
