/**
 * Productized services shown on the home page (and referenced by the contact
 * form's "what do you need" select).
 *
 * Home cards are compact: `title` + `short` + chips. The long `forWhom` /
 * `outcome` / `timeline` copy shows up in the hover preview panel, where
 * `previews` point at the templates or products that solve the service. With
 * more than one, the panel rotates through them (progress bar, pause button).
 *
 * TODO(fab): every `priceFrom` here is a proposal from the audit, not a
 * confirmed number. Adjust or set to 0 to hide the price on that card.
 */
import type { Bi } from './site';

/** Inline icon ids — drawn by Services.astro (lucide-style outlines, no icon library). */
export type ServiceIcon = 'rocket' | 'upload-cloud' | 'layout' | 'server' | 'sparkles' | 'shield-check';

/** Screenshot ids: templates come from src/assets/templates, products and service pages from src/assets/featured. */
export type PreviewImage = 'salvia' | 'mirante' | 'stratus' | 'atelier' | 'brava' | 'pulsar' | 'quasar' | 'nexus' | 'publicar';

export interface ServicePreview {
	image: PreviewImage;
	/** Rendered as "Resolve com: <label>". */
	label: Bi;
	/** Site path ('/templates/<slug>', '/work' or a service page '/servicos/<slug>'); the component runs it through localePath. */
	href: string;
}

export interface Service {
	id: string;
	/** Full name — contact select + e-mail subject. */
	name: Bi;
	/** Card heading (~2 words). */
	title: Bi;
	/** One line under the heading (≤ 70 chars): who it's for / what it is. */
	short: Bi;
	forWhom: Bi;
	outcome: Bi;
	/** BRL. 0 = don't show a price. */
	priceFrom: number;
	timeline: Bi;
	/** Chip-sized version of `timeline` (≤ 22 chars). */
	timelineShort: Bi;
	/** Card colour (hex). Tile tint, active border/glow, chips and sweep line — never body text. */
	hue: string;
	icon: ServiceIcon;
	/** First one shows on load; more than one turns the panel into an auto-advancing carousel. */
	previews: readonly [ServicePreview, ...ServicePreview[]];
}

export const SERVICES: Service[] = [
	{
		id: 'landing',
		name: { pt: 'Landing page que gera lead', en: 'Landing page that generates leads', es: 'Landing page que genera leads' },
		title: { pt: 'Landing page', en: 'Landing page', es: 'Landing page' },
		short: { pt: 'Campanha, lançamento ou produto no ar essa semana.', en: 'Campaign, launch or product live this week.', es: 'Campaña, lanzamiento o producto en línea esta semana.' },
		forWhom: {
			pt: 'Lançamento imobiliário, campanha, produto novo, evento. Quem tem mídia rodando e precisa da página no ar essa semana.',
			en: 'Real-estate launch, campaign, new product, event. Anyone with ads running who needs the page live this week.',
			es: 'Lanzamiento inmobiliario, campaña, producto nuevo, evento. Para quien tiene anuncios activos y necesita la página en línea esta semana.',
		},
		outcome: {
			pt: 'Página no seu domínio com formulário + WhatsApp integrados, SEO técnico, Lighthouse acima de 90 no celular, analytics configurado e 3 meses de ajustes. Template: você escolhe, eu troco marca, cores e copy. Sob medida: estrutura pensada pro seu funil.',
			en: 'Page on your domain with form + WhatsApp wired, technical SEO, Lighthouse above 90 on mobile, analytics set up and 3 months of adjustments. Template: you pick, I swap brand, colors and copy. Custom: structure designed for your funnel.',
			es: 'Página en tu dominio con formulario + WhatsApp integrados, SEO técnico, Lighthouse por encima de 90 en el celular, analytics configurado y 3 meses de ajustes. Plantilla: tú eliges, yo cambio marca, colores y textos. A medida: estructura pensada para tu embudo.',
		},
		priceFrom: 1000,
		timeline: {
			pt: 'template em 3 a 5 dias úteis · sob medida em 2 a 3 semanas',
			en: 'template in 3 to 5 business days · custom in 2 to 3 weeks',
			es: 'plantilla en 3 a 5 días hábiles · a medida en 2 a 3 semanas',
		},
		timelineShort: { pt: '3 a 5 dias úteis', en: '3 to 5 business days', es: '3 a 5 días hábiles' },
		hue: '#ff5964',
		icon: 'rocket',
		previews: [
			{ image: 'mirante', label: { pt: 'Mirante Captação', en: 'Mirante Captação', es: 'Mirante Captação' }, href: '/templates/mirante' },
			{ image: 'salvia', label: { pt: 'Sálvia', en: 'Sálvia', es: 'Sálvia' }, href: '/templates/salvia' },
			{ image: 'stratus', label: { pt: 'Stratus Planos', en: 'Stratus Planos', es: 'Stratus Planos' }, href: '/templates/stratus' },
			{ image: 'brava', label: { pt: 'Brava Vitrine', en: 'Brava Vitrine', es: 'Brava Vitrine' }, href: '/templates/brava' },
		],
	},
	{
		// Has its own page (/servicos/publicar-site-ia, data/servicePages.ts); the panel shows it.
		id: 'publicar',
		name: { pt: 'Publicar site feito com IA', en: 'Publish a website built with AI', es: 'Publicar sitio web hecho con IA' },
		title: { pt: 'Publicar site', en: 'Publish a site', es: 'Publicar sitio' },
		short: {
			pt: 'Site do Lovable, v0 ou Bolt no seu domínio, sem mensalidade.',
			en: 'Your Lovable, v0 or Bolt site on your domain, no monthly fee.',
			es: 'Sitio de Lovable, v0 o Bolt en tu dominio, sin pago mensual.',
		},
		forWhom: {
			pt: 'Quem fez o site ou a landing page no Lovable, v0, Bolt, ChatGPT ou similar e não sabe colocar no ar.',
			en: 'Anyone who built a website or landing page in Lovable, v0, Bolt, ChatGPT or similar and does not know how to put it online.',
			es: 'Para quien hizo el sitio o la landing page en Lovable, v0, Bolt, ChatGPT o similar y no sabe cómo ponerlo en línea.',
		},
		outcome: {
			pt: 'Publicação no seu domínio, SSL, redirecionamento do www, hospedagem sem mensalidade e teste do WhatsApp e dos formulários.',
			en: 'Publishing on your domain, SSL, www redirect, hosting with no monthly fee and testing of WhatsApp and forms.',
			es: 'Publicación en tu dominio, SSL, redirección del www, hosting sin pago mensual y prueba del WhatsApp y de los formularios.',
		},
		priceFrom: 350,
		timeline: {
			pt: 'até 1 dia depois que o domínio e o acesso ao código estiverem liberados',
			en: 'up to 1 day after the domain and access to the code are available',
			es: 'hasta 1 día después de que el dominio y el acceso al código estén disponibles',
		},
		timelineShort: { pt: 'até 1 dia', en: 'up to 1 day', es: 'hasta 1 día' },
		hue: '#0d9488',
		icon: 'upload-cloud',
		previews: [
			{
				image: 'publicar',
				label: { pt: 'Publicar site feito com IA', en: 'Publish a website built with AI', es: 'Publicar sitio web hecho con IA' },
				href: '/servicos/publicar-site-ia',
			},
		],
	},
	{
		id: 'site',
		name: { pt: 'Site institucional ou portal', en: 'Institutional site or portal', es: 'Sitio institucional o portal' },
		title: { pt: 'Site institucional', en: 'Company website', es: 'Sitio institucional' },
		short: {
			pt: 'Pra quem ainda manda cliente pro Instagram.',
			en: 'For companies still sending clients to Instagram.',
			es: 'Para quien todavía manda clientes a Instagram.',
		},
		forWhom: {
			pt: 'Construtoras, clínicas, consultorias e empresas que ainda mandam cliente pro Instagram porque o site não convence.',
			en: 'Developers, clinics, consultancies and companies still sending clients to Instagram because the site doesn’t convince.',
			es: 'Constructoras, clínicas, consultoras y empresas que todavía mandan clientes a Instagram porque el sitio no convence.',
		},
		outcome: {
			pt: 'Site completo, rápido no celular, com CMS pra sua equipe editar (ou estático, custo zero de hospedagem). Domínio, SSL, analytics e mapa de conversão, como fiz pra Conx e Passareli.',
			en: 'Complete site, fast on mobile, with a CMS for your team (or static, zero hosting cost). Domain, SSL, analytics and conversion map, like I did for Conx and Passareli.',
			es: 'Sitio completo, rápido en el celular, con CMS para que tu equipo lo edite (o estático, costo cero de hosting). Dominio, SSL, analytics y mapa de conversión, como hice para Conx y Passareli.',
		},
		priceFrom: 9000,
		timeline: { pt: '3 a 5 semanas', en: '3 to 5 weeks', es: '3 a 5 semanas' },
		timelineShort: { pt: '3 a 5 semanas', en: '3 to 5 weeks', es: '3 a 5 semanas' },
		hue: '#7c3aed',
		icon: 'layout',
		previews: [{ image: 'atelier', label: { pt: 'Atelier Portfólio', en: 'Atelier Portfólio', es: 'Atelier Portfólio' }, href: '/templates/atelier' }],
	},
	{
		id: 'system',
		name: { pt: 'Sistema web ou MVP', en: 'Web system or MVP', es: 'Sistema web o MVP' },
		title: { pt: 'Sistema ou MVP', en: 'System or MVP', es: 'Sistema o MVP' },
		short: {
			pt: 'Dashboard, ferramenta interna ou SaaS sem contratar time.',
			en: 'Dashboard, internal tool or SaaS without hiring a team.',
			es: 'Dashboard, herramienta interna o SaaS sin contratar un equipo.',
		},
		forWhom: {
			pt: 'Founder com produto na cabeça e processo na planilha; empresa que precisa de dashboard, ferramenta interna ou SaaS sem contratar time.',
			en: 'Founders with a product in their head and a process in a spreadsheet; companies that need a dashboard, internal tool or SaaS without hiring a team.',
			es: 'Founder con un producto en la cabeza y el proceso en una hoja de cálculo; empresa que necesita un dashboard, una herramienta interna o un SaaS sin contratar un equipo.',
		},
		outcome: {
			pt: 'Fase 1 no ar: login, banco, telas principais, deploy na AWS (ou onde você já está), documentação e repositório seu. Escopo fechado por fase, preview semanal. Mesma pegada da plataforma multicanal da Nexus.',
			en: 'Phase 1 live: auth, database, core screens, AWS deploy (or wherever you are), docs and your own repo. Fixed scope per phase, weekly previews. Same approach as Nexus’ multichannel platform.',
			es: 'Fase 1 en línea: login, base de datos, pantallas principales, deploy en AWS (o donde ya estés), documentación y un repositorio tuyo. Alcance cerrado por fase, vista previa semanal. El mismo enfoque que la plataforma multicanal de Nexus.',
		},
		priceFrom: 25000,
		timeline: { pt: 'primeira fase em 4 a 8 semanas', en: 'first phase in 4 to 8 weeks', es: 'primera fase en 4 a 8 semanas' },
		timelineShort: { pt: 'fase 1 em 4 a 8 semanas', en: 'phase 1 in 4 to 8 weeks', es: 'fase 1 en 4 a 8 semanas' },
		hue: '#0ea5e9',
		icon: 'server',
		previews: [{ image: 'nexus', label: { pt: 'Nexus Comunicação', en: 'Nexus Comunicação', es: 'Nexus Comunicação' }, href: '/work' }],
	},
	{
		id: 'ai',
		name: { pt: 'IA dentro do seu produto', en: 'AI inside your product', es: 'IA dentro de tu producto' },
		title: { pt: 'IA no produto', en: 'AI in your product', es: 'IA en tu producto' },
		short: {
			pt: 'Agente de verdade no WhatsApp, e-mail ou documentos.',
			en: 'A real agent on WhatsApp, email or documents.',
			es: 'Un agente de verdad en WhatsApp, e-mail o documentos.',
		},
		forWhom: {
			pt: 'SaaS, atendimento ou marketing que quer agente/automação de verdade (WhatsApp, e-mail, documentos), não um chatbot de FAQ.',
			en: 'SaaS, support or marketing teams that want real agents/automation (WhatsApp, email, documents), not a FAQ chatbot.',
			es: 'SaaS, atención al cliente o marketing que quiere un agente o automatización de verdad (WhatsApp, e-mail, documentos), no un chatbot de preguntas frecuentes.',
		},
		outcome: {
			pt: 'Piloto com dados reais: agente com memória, ferramentas e limites, integrado ao que você já usa. OpenAI, Anthropic, Gemini ou self-hosted, escolhido pelo seu custo e sua LGPD. Relatório de custo por conversa antes de escalar.',
			en: 'Pilot on real data: agent with memory, tools and guardrails, integrated with what you already use. OpenAI, Anthropic, Gemini or self-hosted, chosen for your cost and compliance. Cost-per-conversation report before scaling.',
			es: 'Piloto con datos reales: agente con memoria, herramientas y límites, integrado a lo que ya usas. OpenAI, Anthropic, Gemini o self-hosted, elegido según tu costo y tu ley de protección de datos. Informe de costo por conversación antes de escalar.',
		},
		priceFrom: 12000,
		timeline: { pt: 'piloto em 2 a 4 semanas', en: 'pilot in 2 to 4 weeks', es: 'piloto en 2 a 4 semanas' },
		timelineShort: { pt: 'piloto em 2 a 4 semanas', en: 'pilot in 2 to 4 weeks', es: 'piloto en 2 a 4 semanas' },
		hue: '#f59e0b',
		icon: 'sparkles',
		previews: [{ image: 'quasar', label: { pt: 'Quasar', en: 'Quasar', es: 'Quasar' }, href: '/work' }],
	},
	{
		id: 'senior',
		name: { pt: 'Sênior sob demanda', en: 'Senior on demand', es: 'Sénior bajo demanda' },
		title: { pt: 'Sênior sob demanda', en: 'Senior on demand', es: 'Sénior bajo demanda' },
		short: {
			pt: 'Reforço pro seu time: legado, AWS, custo de infra, arquitetura.',
			en: 'Backup for your team: legacy, AWS, infra cost, architecture.',
			es: 'Refuerzo para tu equipo: legado, AWS, costo de infra, arquitectura.',
		},
		forWhom: {
			pt: 'CTO ou time que precisa de reforço sênior: resgatar legado, migrar pra AWS/GCP, derrubar custo de infra, revisar arquitetura antes de crescer.',
			en: 'CTOs or teams that need senior reinforcement: rescue legacy code, migrate to AWS/GCP, cut infra cost, review architecture before scaling.',
			es: 'CTO o equipo que necesita refuerzo sénior: rescatar código legado, migrar a AWS/GCP, bajar el costo de infra, revisar la arquitectura antes de crecer.',
		},
		outcome: {
			pt: 'Auditoria: relatório de dívida técnica com plano priorizado em 5 dias úteis. Pacote mensal: horas fixas, PRs revisados, pareamento com o time. Stack de casa: TypeScript, React/Vue/Next/Nuxt/Astro, Node, C#, AWS.',
			en: 'Audit: tech-debt report with a prioritized plan in 5 business days. Monthly package: fixed hours, reviewed PRs, pairing with the team. Home stack: TypeScript, React/Vue/Next/Nuxt/Astro, Node, C#, AWS.',
			es: 'Auditoría: informe de deuda técnica con un plan priorizado en 5 días hábiles. Paquete mensual: horas fijas, PRs revisados, programación en pareja con el equipo. Stack de la casa: TypeScript, React/Vue/Next/Nuxt/Astro, Node, C#, AWS.',
		},
		priceFrom: 0,
		timeline: { pt: 'auditoria em 1 semana · pacote mensal', en: 'audit in 1 week · monthly package', es: 'auditoría en 1 semana · paquete mensual' },
		timelineShort: { pt: 'auditoria em 1 semana', en: 'audit in 1 week', es: 'auditoría en 1 semana' },
		hue: '#16a34a',
		icon: 'shield-check',
		previews: [{ image: 'pulsar', label: { pt: 'Pulsar', en: 'Pulsar', es: 'Pulsar' }, href: '/work' }],
	},
];
