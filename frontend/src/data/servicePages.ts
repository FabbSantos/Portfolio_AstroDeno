/**
 * Service pages (/servicos/<slug>, /en/servicos/<slug>), rendered by
 * views/ServicePageView.astro. One entry per page; the copy uses only what
 * the brief gave (no invented numbers, clients, guarantees or competitors).
 *
 * The same text feeds the page, its JSON-LD (Service + FAQPage) and /llms.txt,
 * so the answer a search engine or an AI reads is the one on the page.
 */
import type { Bi } from './site';

/** Screenshots in src/assets/featured, picked by ServicePageView. */
export type ProjectImage = 'nexus' | 'quasar' | 'pulsar';

export interface ServicePage {
	/** URL segment: /servicos/<slug>. */
	slug: string;
	/** Matching card id in SERVICES (home list, contact form subject). */
	serviceId: string;
	seo: { title: Bi; description: Bi };
	/** h1 and the Service name in JSON-LD. */
	name: Bi;
	/** JSON-LD serviceType when it differs from the name. */
	serviceType?: Bi;
	/** The line under the h1: who it is for. */
	forWhom: Bi;
	/** BRL, "a partir de". Left out = price on request (no price shown, no Offer in JSON-LD). */
	priceFrom?: number;
	/** After the price ("pagamento único"). */
	priceNote?: Bi;
	/** Short facts under the price. */
	chips?: Bi<readonly string[]>;
	/** The point that sets the service apart, as its own block. */
	highlight?: { title: Bi; text: Bi };
	/** Items written "Label: text" show the label in bold. */
	includes: { title: Bi; items: Bi<readonly string[]> };
	/** Label + value pairs ("Prazo", "Pagamento"…). */
	facts?: { title: Bi; items: readonly { label: Bi; value: Bi }[] };
	/** Work that shows the service, as cards (real screenshots only). */
	projects?: {
		title: Bi;
		items: readonly {
			name: string;
			kind: Bi;
			text: Bi;
			tech?: Bi<readonly string[]>;
			image?: ProjectImage;
			link?: { label: Bi; href: string };
		}[];
	};
	/** How the work goes, in order (shown without numbers). */
	steps?: { title: Bi; items: readonly { title: Bi; text: Bi }[] };
	/** Who does the work, in the dark block. */
	about?: { title: Bi; text: Bi };
	/** Shown only with `enabled: true` (the client must have authorized it). */
	testimonial?: { enabled: boolean; quote: Bi; author: string };
	faq: { title: Bi; items: readonly { q: Bi; a: Bi }[] };
	/**
	 * Where the buttons go: 'whatsapp' (with `whatsappMessage`) or 'form'
	 * (the quote form on the home page, with this service already selected).
	 */
	contact: 'whatsapp' | 'form';
	/** Closing block. `button` is the label of the form button. */
	cta: { title: Bi; text?: Bi; button?: Bi };
	/** Pre-filled WhatsApp message for every button on the page. */
	whatsappMessage?: Bi;
}

export const publicarSiteIa: ServicePage = {
	slug: 'publicar-site-ia',
	serviceId: 'publicar',
	contact: 'whatsapp',
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

/** Price on request, buttons go to the quote form with "Sistema sob medida" selected. */
export const sistemasSobMedida: ServicePage = {
	slug: 'sistemas-sob-medida',
	serviceId: 'system',
	contact: 'form',
	seo: {
		title: {
			pt: 'Sistemas sob medida para o seu negócio · Fabrício Bahiense',
			en: 'Custom software for your business · Fabrício Bahiense',
			es: 'Sistemas a medida para tu negocio · Fabrício Bahiense',
		},
		description: {
			pt: 'Painéis, automações, integrações e plataformas completas. Do primeiro rascunho ao sistema rodando em produção, feito por um engenheiro de software sênior.',
			en: 'Dashboards, automations, integrations and complete platforms. From the first draft to the system running in production, built by a senior software engineer.',
			es: 'Paneles, automatizaciones, integraciones y plataformas completas. Del primer borrador al sistema funcionando en producción, hecho por un ingeniero de software sénior.',
		},
	},
	name: { pt: 'Sistemas sob medida para o seu negócio', en: 'Custom software for your business', es: 'Sistemas a medida para tu negocio' },
	serviceType: { pt: 'Desenvolvimento de software sob medida', en: 'Custom software development', es: 'Desarrollo de software a medida' },
	forWhom: {
		pt: 'Painéis, automações, integrações e plataformas completas. Do primeiro rascunho ao sistema rodando em produção, feito por um engenheiro de software sênior.',
		en: 'Dashboards, automations, integrations and complete platforms. From the first draft to the system running in production, built by a senior software engineer.',
		es: 'Paneles, automatizaciones, integraciones y plataformas completas. Del primer borrador al sistema funcionando en producción, hecho por un ingeniero de software sénior.',
	},
	includes: {
		title: { pt: 'O que eu construo', en: 'What I build', es: 'Lo que construyo' },
		items: {
			pt: [
				'Sistemas internos: painéis de gestão, controle de pedidos, agendamentos, estoque',
				'Automações: tarefas repetitivas que hoje alguém faz na mão, rodando sozinhas',
				'Integrações: ligar seu sistema com WhatsApp, pagamentos, planilhas, ERPs e APIs',
				'Plataformas SaaS: produto completo com login, planos, vários clientes na mesma base',
				'Apps web e mobile',
			],
			en: [
				'Internal systems: management dashboards, order tracking, scheduling, inventory',
				'Automations: repetitive tasks someone does by hand today, running on their own',
				'Integrations: connecting your system to WhatsApp, payments, spreadsheets, ERPs and APIs',
				'SaaS platforms: a complete product with login, plans and many customers on the same base',
				'Web and mobile apps',
			],
			es: [
				'Sistemas internos: paneles de gestión, control de pedidos, agendamientos, inventario',
				'Automatizaciones: tareas repetitivas que hoy alguien hace a mano, funcionando solas',
				'Integraciones: conectar tu sistema con WhatsApp, pagos, hojas de cálculo, ERPs y APIs',
				'Plataformas SaaS: producto completo con login, planes y varios clientes en la misma base',
				'Apps web y móviles',
			],
		},
	},
	projects: {
		title: { pt: 'Projetos', en: 'Projects', es: 'Proyectos' },
		items: [
			// Client case, same copy as on /work (data/works.ts).
			{
				name: 'Nexus Comunicação',
				kind: { pt: 'Tech Lead · arquitetura, time e entrega', en: 'Tech Lead · architecture, team and delivery', es: 'Tech Lead · arquitectura, equipo y entrega' },
				text: {
					pt: 'Plataforma multicanal de comunicação (SMS, WhatsApp, RCS): painel do cliente, API, filas e infra AWS. Liderada ponta a ponta como Tech Lead.',
					en: 'Multichannel communication platform (SMS, WhatsApp, RCS): customer dashboard, API, queues and AWS infra. Led end to end as Tech Lead.',
					es: 'Plataforma multicanal de comunicación (SMS, WhatsApp, RCS): panel del cliente, API, colas e infra en AWS. Liderada de principio a fin como Tech Lead.',
				},
				tech: {
					pt: ['Next.js', 'Nuxt', 'Node.js', 'TypeScript', 'AWS', 'Redis'],
					en: ['Next.js', 'Nuxt', 'Node.js', 'TypeScript', 'AWS', 'Redis'],
					es: ['Next.js', 'Nuxt', 'Node.js', 'TypeScript', 'AWS', 'Redis'],
				},
				image: 'nexus',
				link: { label: { pt: 'Ver a plataforma', en: 'See the platform', es: 'Ver la plataforma' }, href: 'https://app.nexuscomunicacao.com.br' },
			},
			{
				name: 'Quasar',
				kind: { pt: 'Plataforma de comunicação multi-empresa', en: 'Multi-company messaging platform', es: 'Plataforma de comunicación multiempresa' },
				text: {
					pt: 'Plataforma SaaS construída do zero para empresas que enviam mensagens em volume. Cada empresa tem seu ambiente separado, com campanhas, importação de contatos por CSV, inbox em tempo real com mídia, fluxos de atendimento automático e links rastreáveis por contato. As campanhas rodam em filas com controle de ritmo, e uma IA analisa o texto antes do envio para apontar riscos.',
					en: 'A SaaS platform built from scratch for companies that send messages in volume. Each company has its own separate space, with campaigns, contact import from CSV, a real-time inbox with media, automated support flows and per-contact tracked links. Campaigns run in queues with pace control, and an AI reviews the text before sending to point out risks.',
					es: 'Plataforma SaaS construida desde cero para empresas que envían mensajes en volumen. Cada empresa tiene su propio entorno separado, con campañas, importación de contactos por CSV, bandeja de entrada en tiempo real con multimedia, flujos de atención automática y enlaces rastreables por contacto. Las campañas corren en colas con control de ritmo, y una IA analiza el texto antes del envío para señalar riesgos.',
				},
				tech: {
					pt: ['NestJS', 'Next.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Gemini', 'DigitalOcean', 'CI/CD com GitHub Actions'],
					en: ['NestJS', 'Next.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Gemini', 'DigitalOcean', 'CI/CD with GitHub Actions'],
					es: ['NestJS', 'Next.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Gemini', 'DigitalOcean', 'CI/CD con GitHub Actions'],
				},
				image: 'quasar',
			},
			{
				name: 'Pulsar',
				kind: { pt: 'Observabilidade para aplicações Node.js', en: 'Observability for Node.js applications', es: 'Observabilidad para aplicaciones Node.js' },
				text: {
					pt: 'Biblioteca open-source publicada no npm (@fabbahiense/pulsar-node e @fabbahiense/pulsar-pino-transport) que coleta e organiza os logs de aplicações em produção. Integrada ao Quasar, processa mais de 1 milhão de logs por dia.',
					en: 'An open-source library published on npm (@fabbahiense/pulsar-node and @fabbahiense/pulsar-pino-transport) that collects and organizes the logs of applications in production. Integrated with Quasar, it processes more than 1 million logs a day.',
					es: 'Biblioteca open source publicada en npm (@fabbahiense/pulsar-node y @fabbahiense/pulsar-pino-transport) que recoge y organiza los logs de aplicaciones en producción. Integrada a Quasar, procesa más de 1 millón de logs por día.',
				},
				image: 'pulsar',
				link: { label: { pt: 'Ver o pacote no npm', en: 'See the package on npm', es: 'Ver el paquete en npm' }, href: 'https://www.npmjs.com/package/@fabbahiense/pulsar-node' },
			},
		],
	},
	steps: {
		title: { pt: 'Como funciona', en: 'How it works', es: 'Cómo funciona' },
		items: [
			{
				title: { pt: 'Conversa', en: 'Conversation', es: 'Conversación' },
				text: {
					pt: 'Você me conta o problema, sem precisar saber o termo técnico.',
					en: 'You tell me the problem, no need to know the technical term.',
					es: 'Me cuentas el problema, sin necesidad de saber el término técnico.',
				},
			},
			{
				title: { pt: 'Proposta', en: 'Proposal', es: 'Propuesta' },
				text: { pt: 'Escopo, prazo e valor fechados por escrito.', en: 'Scope, timeline and price agreed in writing.', es: 'Alcance, plazo y precio cerrados por escrito.' },
			},
			{
				title: { pt: 'Entregas por etapa', en: 'Delivery in stages', es: 'Entregas por etapa' },
				text: {
					pt: 'Você acompanha e testa desde a primeira semana.',
					en: 'You follow along and test from the first week.',
					es: 'Acompañas y pruebas desde la primera semana.',
				},
			},
			{
				title: { pt: 'Suporte', en: 'Support', es: 'Soporte' },
				text: {
					pt: 'O sistema fica no ar com manutenção e ajustes inclusos por 3 meses.',
					en: 'The system stays online with maintenance and adjustments included for 3 months.',
					es: 'El sistema queda en línea con mantenimiento y ajustes incluidos por 3 meses.',
				},
			},
		],
	},
	about: {
		title: { pt: 'Quem faz', en: 'Who builds it', es: 'Quién lo hace' },
		text: {
			pt: 'Engenheiro de software sênior desde 2018, com experiência em plataformas de mensageria e produtos SaaS. Quem conversa com você é quem escreve o código.',
			en: 'Senior software engineer since 2018, with experience in messaging platforms and SaaS products. The person you talk to is the person who writes the code.',
			es: 'Ingeniero de software sénior desde 2018, con experiencia en plataformas de mensajería y productos SaaS. Quien conversa contigo es quien escribe el código.',
		},
	},
	faq: {
		title: { pt: 'Perguntas frequentes', en: 'Frequently asked questions', es: 'Preguntas frecuentes' },
		items: [
			{
				q: { pt: 'Quanto custa um sistema sob medida?', en: 'How much does custom software cost?', es: '¿Cuánto cuesta un sistema a medida?' },
				a: {
					pt: 'Depende do escopo. A proposta vem com valor fechado depois da primeira conversa, que não tem custo.',
					en: 'It depends on the scope. The proposal comes with a fixed price after the first conversation, which is free.',
					es: 'Depende del alcance. La propuesta llega con un precio cerrado después de la primera conversación, que no tiene costo.',
				},
			},
			{
				q: { pt: 'Quanto tempo leva?', en: 'How long does it take?', es: '¿Cuánto tiempo lleva?' },
				a: {
					pt: 'Projetos menores ficam prontos em 2 a 4 semanas. Plataformas maiores saem em entregas mensais.',
					en: 'Smaller projects are ready in 2 to 4 weeks. Larger platforms are delivered in monthly stages.',
					es: 'Los proyectos más pequeños quedan listos en 2 a 4 semanas. Las plataformas más grandes salen en entregas mensuales.',
				},
			},
			{
				q: { pt: 'Preciso entender de tecnologia?', en: 'Do I need to understand technology?', es: '¿Necesito saber de tecnología?' },
				a: {
					pt: 'Não. Você explica o problema e eu traduzo em sistema.',
					en: 'No. You explain the problem and I turn it into a system.',
					es: 'No. Tú explicas el problema y yo lo convierto en un sistema.',
				},
			},
		],
	},
	cta: {
		title: { pt: 'Contato', en: 'Contact', es: 'Contacto' },
		button: { pt: 'Me conta o que você precisa', en: 'Tell me what you need', es: 'Cuéntame lo que necesitas' },
	},
};

export const servicePages: ServicePage[] = [publicarSiteIa, sistemasSobMedida];
