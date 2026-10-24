/**
 * Template catalogue — shared by the home band, the gallery, the sales page
 * (/templates/<slug>) and the demo pages (/templates/<slug>/demo).
 *
 * A template is a structure, not a niche: the name says what the site does
 * (Agenda, Captação…), `fits` lists kinds of business it serves and each demo
 * is one example of content. The first example lives at /templates/<slug>/demo,
 * the others at /templates/<slug>/demo/<key>.
 */
import type { Bi } from './site';

/** What the site does. Drives the card hue (components/templates/hues.ts). */
export type TemplateKind = 'menu' | 'booking' | 'leads' | 'product' | 'portfolio' | 'storefront';

export interface TemplateExample {
	/** URL segment for extra examples ("salao" → /templates/salvia/demo/salao). Unused for the first. */
	key: string;
	/** Lowercase, reads inside a sentence: "Na demo: clínica e salão". */
	label: Bi;
}

export interface TemplateMeta {
	slug: string;
	name: string;
	/** Optional second word, rendered with the accent colour. Names the function, not a niche. Use `fullName()` for plain text. */
	accent?: string;
	kind: TemplateKind;
	cat: Bi;
	/** One-liner for cards. */
	desc: Bi;
	/** Longer lead for the sales page. */
	lead: Bi;
	/** Kinds of business the structure serves, lowercase, up to 4 ("Serve pra: …"). */
	fits: Bi<readonly string[]>;
	/** Demo contents. The first is the main demo (card preview, Lighthouse score). */
	examples: readonly [TemplateExample, ...TemplateExample[]];
	/** Sections a buyer gets — sales page bullets. */
	sections: Bi<readonly string[]>;
	/**
	 * Full price in BRL ("a partir de R$ 1.000"), shown with TEMPLATE_PROMO while
	 * it lasts. Absent = premium, shown as "sob consulta". Delivery time is the
	 * same for every template: SITE.promises.templateDays.
	 */
	priceFrom?: number;
	/** Locale the demo is written in (demos are single-locale by design). */
	demoLocale: 'pt' | 'en';
	/** Gradient for placeholder tiles. */
	grad: string;
	/** Recently added: "Novo" chip on its card. */
	isNew?: boolean;
}

/** Order = order on the home band and the gallery: the strongest demo leads (Brava), then the newest. */
export const templates: TemplateMeta[] = [
	{
		slug: 'brava',
		name: 'Brava',
		accent: 'Vitrine',
		kind: 'storefront',
		cat: { pt: 'Vitrine · Contagem regressiva', en: 'Storefront · Countdown', es: 'Vitrina · Cuenta regresiva' },
		desc: {
			pt: 'Vitrine com contagem regressiva: produtos, lookbook e newsletter, cada item levando pro seu checkout.',
			en: 'Storefront with a countdown: products, lookbook and newsletter, each item linking to your checkout.',
			es: 'Vitrina con cuenta regresiva: productos, lookbook y newsletter, cada artículo lleva a tu checkout.',
		},
		lead: {
			pt: 'Vitrine pra lançamento com data marcada: contagem regressiva, produtos, lookbook, história e newsletter. Os produtos apontam pro checkout que você já usa (Shopify, Nuvemshop, Yampi). Na demo é um drop de moda, mas serve pra coleção nova, pré-venda, encomendas de época ou ingresso de evento.',
			en: 'Storefront for a dated launch: countdown, products, lookbook, story and newsletter. Products link to the checkout you already use (Shopify, Nuvemshop, Yampi). The demo is a fashion drop, but it fits a new collection, a pre-sale, seasonal orders or event tickets.',
			es: 'Vitrina para un lanzamiento con fecha fija: cuenta regresiva, productos, lookbook, historia y newsletter. Los productos apuntan al checkout que ya usas (Shopify, Nuvemshop, Yampi). En la demo es un drop de moda, pero sirve para una colección nueva, preventa, pedidos de temporada o entradas para eventos.',
		},
		fits: {
			pt: ['loja ou marca', 'coleção nova', 'pré-venda', 'evento com ingresso'],
			en: ['shop or brand', 'new collection', 'pre-sale', 'ticketed event'],
			es: ['tienda o marca', 'colección nueva', 'preventa', 'evento con entradas'],
		},
		examples: [{ key: 'moda', label: { pt: 'drop de moda', en: 'fashion drop', es: 'drop de moda' } }],
		sections: {
			pt: ['Hero + contagem regressiva', 'Vitrine (6 produtos)', 'Lookbook', 'História', 'Newsletter', 'Rodapé'],
			en: ['Hero + countdown', 'Storefront (6 products)', 'Lookbook', 'Story', 'Newsletter', 'Footer'],
			es: ['Hero + cuenta regresiva', 'Vitrina (6 productos)', 'Lookbook', 'Historia', 'Newsletter', 'Pie de página'],
		},
		demoLocale: 'en',
		grad: 'linear-gradient(135deg,#DCFCE7,#B8F5CB)',
	},
	{
		slug: 'pimenta',
		name: 'Pimenta',
		kind: 'menu',
		cat: { pt: 'Cardápio · Reservas', en: 'Menu · Reservations', es: 'Menú · Reservas' },
		desc: {
			pt: 'Pra quem serve comida ou bebida: cardápio com preços, pratos da casa, reserva pelo WhatsApp e horário com "aberto agora".',
			en: 'For places that serve food or drinks: priced menu, signature dishes, WhatsApp reservations and live "open now" hours.',
			es: 'Para quien sirve comida o bebida: menú con precios, platos de la casa, reservas por WhatsApp y horario con "abierto ahora".',
		},
		lead: {
			pt: 'Página com cara de cartaz pra quem vive de mesa cheia. Cardápio com preços e selos (vegano, sem glúten), os pratos da casa em painéis que abrem no hover, a equipe, reserva que monta a mensagem no WhatsApp e links de delivery. Veja a mesma estrutura como restaurante e como café.',
			en: 'A poster-like page for places that live on full tables. Priced menu with marks (vegan, gluten-free), signature dishes in panels that open on hover, the crew, a reservation that writes the WhatsApp message, and delivery links. See the same structure as a restaurant and as a café.',
			es: 'Página con aire de cartel para quien vive de mesas llenas. Menú con precios y etiquetas (vegano, sin gluten), los platos de la casa en paneles que se abren al pasar el cursor, el equipo, una reserva que arma el mensaje de WhatsApp y enlaces de delivery. Mira la misma estructura como restaurante y como café.',
		},
		fits: {
			pt: ['restaurante', 'bar e boteco', 'café e padaria', 'hamburgueria'],
			en: ['restaurant', 'bar', 'café and bakery', 'burger joint'],
			es: ['restaurante', 'bar y cantina', 'café y panadería', 'hamburguesería'],
		},
		examples: [
			{ key: 'restaurante', label: { pt: 'restaurante', en: 'restaurant', es: 'restaurante' } },
			{ key: 'cafe', label: { pt: 'café', en: 'café', es: 'café' } },
		],
		sections: {
			pt: ['Hero com prato em destaque e horário ao vivo', 'Cardápio com preços e selos', 'Pratos da casa em painéis', 'Equipe', 'Reserva pelo WhatsApp e links de delivery', 'Onde estamos e horários', 'Rodapé com dados da empresa'],
			en: ['Hero with a featured plate and live hours', 'Priced menu with marks', 'Signature dishes in panels', 'Team', 'WhatsApp reservation and delivery links', 'Location and hours', 'Footer with company details'],
			es: ['Hero con plato destacado y horario en vivo', 'Menú con precios y etiquetas', 'Platos de la casa en paneles', 'Equipo', 'Reservas por WhatsApp y enlaces de delivery', 'Dónde estamos y horarios', 'Pie de página con datos de la empresa'],
		},
		priceFrom: 1000,
		demoLocale: 'pt',
		grad: 'linear-gradient(135deg,#FFF1C2,#F2B705)',
		isNew: true,
	},
	{
		slug: 'salvia',
		name: 'Sálvia',
		kind: 'booking',
		cat: { pt: 'Agendamento · WhatsApp', en: 'Booking · WhatsApp', es: 'Citas · WhatsApp' },
		desc: {
			pt: 'Pra quem atende com hora marcada: serviços, agendamento pelo WhatsApp em dois toques e horário com "aberto agora".',
			en: 'For businesses that run on appointments: services, two-tap WhatsApp booking and live "open now" hours.',
			es: 'Para quien atiende con cita previa: servicios, reserva de citas por WhatsApp en dos toques y horario con "abierto ahora".',
		},
		lead: {
			pt: 'Página enxuta pra quem atende com hora marcada. O cliente escolhe o serviço e o período e a mensagem sai pronta no WhatsApp. Equipe, convênios ou formas de pagamento, horário ao vivo e SEO local já configurado. Veja a mesma estrutura como clínica e como salão.',
			en: 'A lean page for businesses that run on appointments. Customers pick a service and a time of day and the WhatsApp message is ready to send. Team, insurance or payment options, live opening hours and local SEO built in. See the same structure as a clinic and as a salon.',
			es: 'Página sencilla para quien atiende con cita previa. El cliente elige el servicio y el turno, y el mensaje sale listo en WhatsApp. Equipo, seguros médicos o formas de pago, horario en vivo y SEO local ya configurado. Mira la misma estructura como clínica y como salón.',
		},
		fits: {
			pt: ['clínica', 'salão e barbearia', 'estúdio de estética', 'escritório'],
			en: ['clinic', 'salon and barber', 'beauty studio', 'office'],
			es: ['clínica', 'salón y barbería', 'estudio de estética', 'oficina'],
		},
		examples: [
			{ key: 'clinica', label: { pt: 'clínica', en: 'clinic', es: 'clínica' } },
			{ key: 'salao', label: { pt: 'salão', en: 'salon', es: 'salón' } },
		],
		sections: {
			pt: ['Hero editorial com horário ao vivo', 'Serviços com foto no hover', 'Agendamento pelo WhatsApp', 'Equipe', 'Convênios ou formas de pagamento', 'Espaço', 'Perguntas frequentes', 'Como chegar e horários', 'Rodapé com dados da empresa'],
			en: ['Editorial hero with live hours', 'Services with hover photos', 'WhatsApp booking', 'Team', 'Insurance or payment options', 'The space', 'FAQ', 'Directions and hours', 'Footer with company details'],
			es: ['Hero editorial con horario en vivo', 'Servicios con foto al pasar el cursor', 'Citas por WhatsApp', 'Equipo', 'Seguros médicos o formas de pago', 'El espacio', 'Preguntas frecuentes', 'Cómo llegar y horarios', 'Pie de página con datos de la empresa'],
		},
		priceFrom: 1000,
		demoLocale: 'pt',
		grad: 'linear-gradient(135deg,#E4EDE6,#BCD4C3)',
		isNew: true,
	},
	{
		slug: 'mirante',
		name: 'Mirante',
		accent: 'Captação',
		kind: 'leads',
		cat: { pt: 'Captação · Formulário', en: 'Lead capture · Form', es: 'Captación · Formulario' },
		desc: {
			pt: 'Página de captação: formulário já no topo, números, detalhes, localização e condições. Feita pra encher a lista de interessados.',
			en: 'Lead-capture page: form right in the hero, numbers, details, location and terms. Built to fill a list of interested people.',
			es: 'Página de captación: formulario desde el inicio, cifras, detalles, ubicación y condiciones. Hecha para llenar la lista de interesados.',
		},
		lead: {
			pt: 'Página de captação no padrão brasileiro: faixa de números, galeria, opções, mapa, condições e formulário de alta intenção. Na demo é um lançamento imobiliário, mas a estrutura serve pra qualquer oferta que precisa do contato antes da venda.',
			en: 'Brazilian-style lead-capture page: numbers band, gallery, options, location map, terms and a high-intent form. The demo is a real-estate launch, but the structure fits any offer that needs a contact before the sale.',
			es: 'Página de captación al estilo brasileño: franja de cifras, galería, opciones, mapa, condiciones y formulario de alta intención. En la demo es un lanzamiento inmobiliario, pero la estructura sirve para cualquier oferta que necesite el contacto antes de la venta.',
		},
		fits: {
			pt: ['lançamento imobiliário', 'curso ou turma', 'evento', 'pré-venda'],
			en: ['real-estate launch', 'course or cohort', 'event', 'pre-sale'],
			es: ['lanzamiento inmobiliario', 'curso o grupo', 'evento', 'preventa'],
		},
		examples: [{ key: 'imovel', label: { pt: 'lançamento imobiliário', en: 'real-estate launch', es: 'lanzamiento inmobiliario' } }],
		sections: {
			pt: ['Hero com formulário', 'Faixa de números', 'O produto e os diferenciais', 'Opções (plantas, turmas, pacotes)', 'Localização', 'Condições', 'Formulário completo', 'Rodapé com dados legais'],
			en: ['Hero with lead form', 'Numbers band', 'The offer and its highlights', 'Options (floor plans, cohorts, packages)', 'Location', 'Terms', 'Full lead form', 'Legal footer'],
			es: ['Hero con formulario', 'Franja de cifras', 'El producto y sus diferenciales', 'Opciones (planos, grupos, paquetes)', 'Ubicación', 'Condiciones', 'Formulario completo', 'Pie de página con datos legales'],
		},
		demoLocale: 'pt',
		grad: 'linear-gradient(135deg,#F0E6D2,#D9B98E)',
	},
	{
		slug: 'stratus',
		name: 'Stratus',
		accent: 'Planos',
		kind: 'product',
		cat: { pt: 'Produto · Planos', en: 'Product · Plans', es: 'Producto · Planes' },
		desc: {
			pt: 'Página de produto com planos: prova social, recursos, tabela de preços e perguntas frequentes.',
			en: 'Product page with plans: social proof, features, pricing table and FAQ.',
			es: 'Página de producto con planes: prueba social, funciones, tabla de precios y preguntas frecuentes.',
		},
		lead: {
			pt: 'Página de produto focada em conversão: hero forte, prova social, recursos, três planos e perguntas frequentes. Na demo é um SaaS B2B, mas serve pra app, curso online, assinatura ou qualquer serviço vendido em planos.',
			en: 'Conversion-focused product page: strong hero, social proof, features, three plans and FAQ. The demo is a B2B SaaS, but it fits an app, an online course, a subscription or any service sold in plans.',
			es: 'Página de producto enfocada en conversión: hero fuerte, prueba social, funciones, tres planes y preguntas frecuentes. En la demo es un SaaS B2B, pero sirve para app, curso online, suscripción o cualquier servicio vendido por planes.',
		},
		fits: {
			pt: ['software ou app', 'curso online', 'assinatura', 'serviço com planos'],
			en: ['software or app', 'online course', 'subscription', 'service with plans'],
			es: ['software o app', 'curso online', 'suscripción', 'servicio con planes'],
		},
		examples: [{ key: 'saas', label: { pt: 'SaaS B2B', en: 'B2B SaaS', es: 'SaaS B2B' } }],
		sections: {
			pt: ['Hero + CTA principal', 'Tela do produto em moldura', 'Logos de clientes', 'Recursos em grade', 'Planos em tabela comparativa', 'Perguntas frequentes', 'CTA final', 'Rodapé'],
			en: ['Hero + main CTA', 'Product shot in a frame', 'Client logos', 'Feature grid', 'Plans as a comparison table', 'FAQ', 'Final CTA', 'Footer'],
			es: ['Hero + CTA principal', 'Pantalla del producto en un marco', 'Logos de clientes', 'Funciones en cuadrícula', 'Planes en tabla comparativa', 'Preguntas frecuentes', 'CTA final', 'Pie de página'],
		},
		demoLocale: 'en',
		grad: 'linear-gradient(135deg,#FFE8DE,#FFD4C2)',
	},
	{
		slug: 'atelier',
		name: 'Atelier',
		accent: 'Portfólio',
		kind: 'portfolio',
		cat: { pt: 'Portfólio · Trabalhos', en: 'Portfolio · Work', es: 'Portafolio · Trabajos' },
		desc: {
			pt: 'Portfólio editorial: grid de trabalhos, números do estúdio e muito respiro.',
			en: 'Editorial portfolio: work grid, studio stats and lots of whitespace.',
			es: 'Portafolio editorial: cuadrícula de trabajos, cifras del estudio y mucho aire.',
		},
		lead: {
			pt: 'Portfólio editorial pra quem vende pelo que já fez: grid de trabalhos, o estúdio em números e contato. Na demo é um estúdio de design, mas serve pra fotógrafo, arquiteto, produtora ou freelancer.',
			en: 'Editorial portfolio for people who sell through past work: project grid, the studio in numbers, and contact. The demo is a design studio, but it fits a photographer, an architect, a production company or a freelancer.',
			es: 'Portafolio editorial para quien vende con lo que ya hizo: cuadrícula de trabajos, el estudio en cifras y contacto. En la demo es un estudio de diseño, pero sirve para fotógrafo, arquitecto, productora o freelancer.',
		},
		fits: {
			pt: ['agência ou estúdio', 'fotógrafo', 'arquitetura', 'freelancer'],
			en: ['agency or studio', 'photographer', 'architecture', 'freelancer'],
			es: ['agencia o estudio', 'fotógrafo', 'arquitectura', 'freelancer'],
		},
		examples: [{ key: 'estudio', label: { pt: 'estúdio de design', en: 'design studio', es: 'estudio de diseño' } }],
		sections: {
			pt: ['Hero editorial', 'Grid de 6 trabalhos', 'Sobre + números', 'Contato', 'Rodapé'],
			en: ['Editorial hero', '6-project grid', 'About + stats', 'Contact', 'Footer'],
			es: ['Hero editorial', 'Cuadrícula de 6 trabajos', 'Acerca de + cifras', 'Contacto', 'Pie de página'],
		},
		priceFrom: 1000,
		demoLocale: 'en',
		grad: 'linear-gradient(135deg,#E8E4FE,#D4CFFA)',
	},
];

export const getTemplate = (slug: string) => templates.find((t) => t.slug === slug);
/** "Mirante Captação", or just "Sálvia" when there is no accent word. */
export const fullName = (tpl: Pick<TemplateMeta, 'name' | 'accent'>) => (tpl.accent ? `${tpl.name} ${tpl.accent}` : tpl.name);
export const demoPath = (slug: string) => `/templates/${slug}/demo`;

/** Demo URL of one example: the first is the main demo, the rest live under it. */
export const examplePath = (tpl: TemplateMeta, key: string) => (key === tpl.examples[0].key ? demoPath(tpl.slug) : `${demoPath(tpl.slug)}/${key}`);

/** "a, b e c" / "a, b and c". */
const INTL_TAG = { pt: 'pt-BR', en: 'en-US', es: 'es-419' } as const;

export const joinList = (items: readonly string[], locale: keyof typeof INTL_TAG) =>
	new Intl.ListFormat(INTL_TAG[locale], { style: 'long', type: 'conjunction' }).format(items);

/**
 * Launch promo on the simple templates (the ones with a price): `off` of the
 * full price until `until` (inclusive, São Paulo time). Pages are built
 * ahead of time, so the layout also hides it in the browser once the date
 * passes (html.promo-over, see Layout).
 */
export const TEMPLATE_PROMO = { off: 0.5, until: '2026-12-31' } as const;

/** Today in São Paulo as YYYY-MM-DD. */
export const todaySP = (now = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(now);

/** Whether the promo shows on a page built now. */
export const promoOn = (today = todaySP()) => today <= TEMPLATE_PROMO.until;

/** Last day of the promo for display: "31/12" / "Dec 31". */
export const promoUntilLabel = (locale: keyof typeof INTL_TAG) =>
	new Intl.DateTimeFormat(INTL_TAG[locale], locale === 'en' ? { month: 'short', day: 'numeric', timeZone: 'UTC' } : { day: '2-digit', month: '2-digit', timeZone: 'UTC' }).format(
		new Date(`${TEMPLATE_PROMO.until}T12:00:00Z`),
	);

/** Promo price, rounded to R$ 100 like every other price on the site. */
export const promoPrice = (full: number) => Math.round((full * (1 - TEMPLATE_PROMO.off)) / 100) * 100;

export function formatBRL(n: number): string {
	return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(n);
}
