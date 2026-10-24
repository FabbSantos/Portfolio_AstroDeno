/**
 * Service pages (/servicos/<slug>, /en/servicos/<slug>), rendered by
 * views/ServicePageView.astro. One entry per page; the copy uses only what
 * the brief gave (no invented numbers, clients, guarantees or competitors).
 *
 * The same text feeds the page, its JSON-LD (Service + FAQPage) and /llms.txt,
 * so the answer a search engine or an AI reads is the one on the page.
 */
import type { Bi } from './site';

export interface ServicePage {
	/** URL segment: /servicos/<slug>. */
	slug: string;
	/** Matching card id in SERVICES (home list, contact form subject). */
	serviceId: string;
	seo: { title: Bi; description: Bi };
	/** h1 and the Service name in JSON-LD. */
	name: Bi;
	/** The line under the h1: who it is for. */
	forWhom: Bi;
	/** BRL, "a partir de". */
	priceFrom: number;
	/** After the price ("pagamento único"). */
	priceNote: Bi;
	/** Short facts under the price. */
	chips: Bi<readonly string[]>;
	/** The point that sets the service apart, as its own block. */
	highlight: { title: Bi; text: Bi };
	includes: { title: Bi; items: Bi<readonly string[]> };
	/** Label + value pairs ("Prazo", "Pagamento"…). */
	facts: { title: Bi; items: readonly { label: Bi; value: Bi }[] };
	/** Shown only with `enabled: true` (the client must have authorized it). */
	testimonial: { enabled: boolean; quote: Bi; author: string };
	faq: { title: Bi; items: readonly { q: Bi; a: Bi }[] };
	/** Closing block. */
	cta: { title: Bi; text: Bi };
	/** Pre-filled WhatsApp message for every button on the page. */
	whatsappMessage: Bi;
}

export const publicarSiteIa: ServicePage = {
	slug: 'publicar-site-ia',
	serviceId: 'publicar',
	seo: {
		title: {
			pt: 'Publicar site feito com IA (Lovable, v0, Bolt) · Fabrício Bahiense',
			en: 'Publish a website built with AI (Lovable, v0, Bolt) · Fabrício Bahiense',
			es: 'Publicar sitio web hecho con IA (Lovable, v0, Bolt) · Fabrício Bahiense',
		},
		description: {
			pt: 'Colocar site no ar sem mensalidade: publico sua landing page feita com IA no Lovable, v0 ou Bolt no seu domínio, com SSL. A partir de R$ 350, pagamento único.',
			en: 'Put your site online with no monthly hosting fee: I publish your landing page built with AI in Lovable, v0 or Bolt on your domain, with SSL. From R$ 350, one-time payment.',
			es: 'Pon tu sitio en línea sin pago mensual: publico tu landing page hecha con IA en Lovable, v0 o Bolt en tu dominio, con SSL. Desde R$ 350, pago único.',
		},
	},
	name: { pt: 'Publicar site feito com IA', en: 'Publish a website built with AI', es: 'Publicar sitio web hecho con IA' },
	forWhom: {
		pt: 'Pra quem fez o site ou a landing page no Lovable, v0, Bolt, ChatGPT ou similar e não sabe colocar no ar.',
		en: 'For anyone who built a website or landing page in Lovable, v0, Bolt, ChatGPT or similar and does not know how to put it online.',
		es: 'Para quien hizo el sitio o la landing page en Lovable, v0, Bolt, ChatGPT o similar y no sabe cómo ponerlo en línea.',
	},
	priceFrom: 350,
	priceNote: { pt: 'pagamento único', en: 'one-time payment', es: 'pago único' },
	chips: {
		pt: ['Até 1 dia', 'Todo o Brasil, online', 'Pix ou cartão, com nota fiscal'],
		en: ['Up to 1 day', 'All of Brazil, online', 'Pix or card, with an official invoice'],
		es: ['Hasta 1 día', 'Todo Brasil, online', 'Pix o tarjeta, con factura'],
	},
	highlight: {
		title: { pt: 'Sem mensalidade de hospedagem', en: 'No monthly hosting fee', es: 'Sin pago mensual de hosting' },
		text: {
			pt: 'O comum é pagar hospedagem todo mês. Aqui não tem mensalidade: você paga uma vez pela publicação.',
			en: 'Paying for hosting every month is the norm. Here there is no monthly fee: you pay once for the publishing.',
			es: 'Lo común es pagar hosting todos los meses. Aquí no hay pago mensual: pagas una sola vez por la publicación.',
		},
	},
	includes: {
		title: { pt: 'O que inclui', en: 'What is included', es: 'Qué incluye' },
		items: {
			pt: ['Publicação no seu domínio', 'SSL', 'Redirecionamento do www', 'Hospedagem sem mensalidade', 'Teste do WhatsApp e dos formulários'],
			en: ['Publishing on your domain', 'SSL', 'www redirect', 'Hosting with no monthly fee', 'Testing of WhatsApp and forms'],
			es: ['Publicación en tu dominio', 'SSL', 'Redirección del www', 'Hosting sin pago mensual', 'Prueba del WhatsApp y de los formularios'],
		},
	},
	facts: {
		title: { pt: 'Prazo e pagamento', en: 'Timing and payment', es: 'Plazo y pago' },
		items: [
			{
				label: { pt: 'Prazo', en: 'Timing', es: 'Plazo' },
				value: {
					pt: 'Até 1 dia depois que o domínio e o acesso ao código estiverem liberados',
					en: 'Up to 1 day after the domain and access to the code are available',
					es: 'Hasta 1 día después de que el dominio y el acceso al código estén disponibles',
				},
			},
			{
				label: { pt: 'Preço', en: 'Price', es: 'Precio' },
				value: { pt: 'A partir de R$ 350, pagamento único', en: 'From R$ 350, one-time payment', es: 'Desde R$ 350, pago único' },
			},
			{
				label: { pt: 'Pagamento', en: 'Payment', es: 'Pago' },
				value: { pt: 'Pix ou cartão, com nota fiscal', en: 'Pix or card, with an official invoice (nota fiscal)', es: 'Pix o tarjeta, con factura (nota fiscal)' },
			},
			{
				label: { pt: 'Atendimento', en: 'Where', es: 'Atención' },
				value: { pt: 'Todo o Brasil, online', en: 'All of Brazil, online', es: 'Todo Brasil, online' },
			},
		],
	},
	testimonial: {
		enabled: true,
		quote: {
			pt: 'Olhei seu site e gostei da introdução. E não me arrependi nem um pouco.',
			en: 'I looked at your site and liked the introduction. And I did not regret it one bit.',
			es: 'Miré tu sitio y me gustó la introducción. Y no me arrepentí para nada.',
		},
		author: 'Ryan, Nexo Gráfica',
	},
	faq: {
		title: { pt: 'Perguntas frequentes', en: 'Frequently asked questions', es: 'Preguntas frecuentes' },
		items: [
			{
				q: { pt: 'Preciso pagar mensalidade de hospedagem?', en: 'Do I need to pay a monthly hosting fee?', es: '¿Tengo que pagar hosting todos los meses?' },
				a: {
					pt: 'Não. A hospedagem não tem mensalidade: você paga uma vez pela publicação, a partir de R$ 350.',
					en: 'No. Hosting has no monthly fee: you pay once for the publishing, from R$ 350.',
					es: 'No. El hosting no tiene pago mensual: pagas una sola vez por la publicación, desde R$ 350.',
				},
			},
			{
				q: {
					pt: 'Funciona com site feito no Lovable, v0 ou Bolt?',
					en: 'Does it work with a site built in Lovable, v0 or Bolt?',
					es: '¿Funciona con un sitio hecho en Lovable, v0 o Bolt?',
				},
				a: {
					pt: 'Sim. O serviço é pra site ou landing page feito no Lovable, v0, Bolt, ChatGPT ou similar.',
					en: 'Yes. The service is for websites and landing pages built in Lovable, v0, Bolt, ChatGPT or similar.',
					es: 'Sí. El servicio es para sitios o landing pages hechos en Lovable, v0, Bolt, ChatGPT o similar.',
				},
			},
			{
				q: { pt: 'Eu preciso comprar o domínio?', en: 'Do I need to buy the domain?', es: '¿Tengo que comprar el dominio?' },
				a: { pt: 'Sim. A publicação é feita no seu domínio.', en: 'Yes. The site is published on your domain.', es: 'Sí. La publicación se hace en tu dominio.' },
			},
			{
				q: { pt: 'Em quanto tempo o site fica no ar?', en: 'How long until the site is online?', es: '¿En cuánto tiempo queda el sitio en línea?' },
				a: {
					pt: 'Em até 1 dia depois que o domínio e o acesso ao código estiverem liberados.',
					en: 'Up to 1 day after the domain and access to the code are available.',
					es: 'En 1 día como máximo, después de que el dominio y el acceso al código estén disponibles.',
				},
			},
			{
				q: { pt: 'Posso continuar editando o site depois?', en: 'Can I keep editing the site afterwards?', es: '¿Puedo seguir editando el sitio después?' },
				a: {
					pt: 'Pode. Cada edição que você enviar pra branch main do código vira uma nova versão no ar, sozinha.',
					en: 'Yes. Every change you push to the main branch of the code becomes a new live version on its own.',
					es: 'Sí. Cada cambio que envíes a la rama main del código se convierte solo en una nueva versión en línea.',
				},
			},
		],
	},
	cta: {
		title: { pt: 'Contato', en: 'Contact', es: 'Contacto' },
		text: {
			pt: 'Manda no WhatsApp que eu coloco no ar no seu domínio, sem mensalidade de hospedagem.',
			en: 'Send me a WhatsApp message and I will put it online on your domain, with no monthly hosting fee.',
			es: 'Escríbeme por WhatsApp y lo pongo en línea en tu dominio, sin pago mensual de hosting.',
		},
	},
	whatsappMessage: {
		pt: 'Oi Fabrício! Fiz um site com IA e quero colocar no ar.',
		en: 'Hi Fabrício! I built a site with AI and want to put it online.',
		es: '¡Hola, Fabrício! Hice un sitio con IA y quiero ponerlo en línea.',
	},
};

export const servicePages: ServicePage[] = [publicarSiteIa];
