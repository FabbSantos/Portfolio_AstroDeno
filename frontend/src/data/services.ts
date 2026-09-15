/**
 * Productized services shown on the home page (and referenced by the contact
 * form's "what do you need" select).
 *
 * Home cards are compact: `title` + `short` + chips. The long `forWhom` /
 * `outcome` / `timeline` copy shows up in the hover preview panel, where
 * `preview` points at the template or product that solves the service.
 *
 * TODO(fab): every `priceFrom` here is a proposal from the audit, not a
 * confirmed number. Adjust or set to 0 to hide the price on that card.
 */
import type { Bi } from './site';

/** Inline icon ids — drawn by Services.astro (lucide-style outlines, no icon library). */
export type ServiceIcon = 'rocket' | 'layout' | 'server' | 'sparkles' | 'shield-check';

/** Screenshot ids: templates come from src/assets/templates, products from src/assets/featured. */
export type PreviewImage = 'mirante' | 'stratus' | 'atelier' | 'brava' | 'pulsar' | 'quasar' | 'nexus';

export interface ServicePreview {
	image: PreviewImage;
	/** Rendered as "Resolve com: <label>". */
	label: Bi;
	/** Site path ('/templates/<slug>' or '/work'); the component runs it through localePath. */
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
	preview: ServicePreview;
}

export const SERVICES: Service[] = [
	{
		id: 'landing',
		name: { pt: 'Landing page que gera lead', en: 'Landing page that generates leads' },
		title: { pt: 'Landing page', en: 'Landing page' },
		short: { pt: 'Campanha, lançamento ou produto no ar essa semana.', en: 'Campaign, launch or product live this week.' },
		forWhom: {
			pt: 'Lançamento imobiliário, campanha, produto novo, evento. Quem tem mídia rodando e precisa da página no ar essa semana.',
			en: 'Real-estate launch, campaign, new product, event. Anyone with ads running who needs the page live this week.',
		},
		outcome: {
			pt: 'Página no seu domínio com formulário + WhatsApp integrados, SEO técnico, Lighthouse acima de 90 no celular, analytics configurado e 3 meses de ajustes. Template: você escolhe, eu troco marca, cores e copy. Sob medida: estrutura pensada pro seu funil.',
			en: 'Page on your domain with form + WhatsApp wired, technical SEO, Lighthouse above 90 on mobile, analytics set up and 3 months of adjustments. Template: you pick, I swap brand, colors and copy. Custom: structure designed for your funnel.',
		},
		priceFrom: 3500,
		timeline: { pt: 'template em 3 a 5 dias úteis · sob medida em 2 a 3 semanas', en: 'template in 3 to 5 business days · custom in 2 to 3 weeks' },
		timelineShort: { pt: '3 a 5 dias úteis', en: '3 to 5 business days' },
		hue: '#ff5964',
		icon: 'rocket',
		preview: {
			image: 'mirante',
			label: { pt: 'Mirante Lançamento', en: 'Mirante Lançamento' },
			href: '/templates/mirante',
		},
	},
	{
		id: 'site',
		name: { pt: 'Site institucional ou portal', en: 'Institutional site or portal' },
		title: { pt: 'Site institucional', en: 'Company website' },
		short: { pt: 'Pra quem ainda manda cliente pro Instagram.', en: 'For companies still sending clients to Instagram.' },
		forWhom: {
			pt: 'Construtoras, clínicas, consultorias e empresas que ainda mandam cliente pro Instagram porque o site não convence.',
			en: 'Developers, clinics, consultancies and companies still sending clients to Instagram because the site doesn’t convince.',
		},
		outcome: {
			pt: 'Site completo, rápido no celular, com CMS pra sua equipe editar (ou estático, custo zero de hospedagem). Domínio, SSL, analytics e mapa de conversão, como fiz pra Conx e Passareli.',
			en: 'Complete site, fast on mobile, with a CMS for your team (or static, zero hosting cost). Domain, SSL, analytics and conversion map, like I did for Conx and Passareli.',
		},
		priceFrom: 9000,
		timeline: { pt: '3 a 5 semanas', en: '3 to 5 weeks' },
		timelineShort: { pt: '3 a 5 semanas', en: '3 to 5 weeks' },
		hue: '#7c3aed',
		icon: 'layout',
		preview: {
			image: 'atelier',
			label: { pt: 'Atelier Studio', en: 'Atelier Studio' },
			href: '/templates/atelier',
		},
	},
	{
		id: 'system',
		name: { pt: 'Sistema web ou MVP', en: 'Web system or MVP' },
		title: { pt: 'Sistema ou MVP', en: 'System or MVP' },
		short: { pt: 'Dashboard, ferramenta interna ou SaaS sem contratar time.', en: 'Dashboard, internal tool or SaaS without hiring a team.' },
		forWhom: {
			pt: 'Founder com produto na cabeça e processo na planilha; empresa que precisa de dashboard, ferramenta interna ou SaaS sem contratar time.',
			en: 'Founders with a product in their head and a process in a spreadsheet; companies that need a dashboard, internal tool or SaaS without hiring a team.',
		},
		outcome: {
			pt: 'Fase 1 no ar: login, banco, telas principais, deploy na AWS (ou onde você já está), documentação e repositório seu. Escopo fechado por fase, preview semanal. Mesma pegada da plataforma multicanal da Nexus.',
			en: 'Phase 1 live: auth, database, core screens, AWS deploy (or wherever you are), docs and your own repo. Fixed scope per phase, weekly previews. Same approach as Nexus’ multichannel platform.',
		},
		priceFrom: 25000,
		timeline: { pt: 'primeira fase em 4 a 8 semanas', en: 'first phase in 4 to 8 weeks' },
		timelineShort: { pt: 'fase 1 em 4 a 8 semanas', en: 'phase 1 in 4 to 8 weeks' },
		hue: '#0ea5e9',
		icon: 'server',
		preview: {
			image: 'nexus',
			label: { pt: 'Nexus Comunicação', en: 'Nexus Comunicação' },
			href: '/work',
		},
	},
	{
		id: 'ai',
		name: { pt: 'IA dentro do seu produto', en: 'AI inside your product' },
		title: { pt: 'IA no produto', en: 'AI in your product' },
		short: { pt: 'Agente de verdade no WhatsApp, e-mail ou documentos.', en: 'A real agent on WhatsApp, email or documents.' },
		forWhom: {
			pt: 'SaaS, atendimento ou marketing que quer agente/automação de verdade (WhatsApp, e-mail, documentos), não um chatbot de FAQ.',
			en: 'SaaS, support or marketing teams that want real agents/automation (WhatsApp, email, documents), not a FAQ chatbot.',
		},
		outcome: {
			pt: 'Piloto com dados reais: agente com memória, ferramentas e limites, integrado ao que você já usa. OpenAI, Anthropic, Gemini ou self-hosted, escolhido pelo seu custo e sua LGPD. Relatório de custo por conversa antes de escalar.',
			en: 'Pilot on real data: agent with memory, tools and guardrails, integrated with what you already use. OpenAI, Anthropic, Gemini or self-hosted, chosen for your cost and compliance. Cost-per-conversation report before scaling.',
		},
		priceFrom: 12000,
		timeline: { pt: 'piloto em 2 a 4 semanas', en: 'pilot in 2 to 4 weeks' },
		timelineShort: { pt: 'piloto em 2 a 4 semanas', en: 'pilot in 2 to 4 weeks' },
		hue: '#f59e0b',
		icon: 'sparkles',
		preview: {
			image: 'quasar',
			label: { pt: 'Quasar', en: 'Quasar' },
			href: '/work',
		},
	},
	{
		id: 'senior',
		name: { pt: 'Sênior sob demanda', en: 'Senior on demand' },
		title: { pt: 'Sênior sob demanda', en: 'Senior on demand' },
		short: { pt: 'Reforço pro seu time: legado, AWS, custo de infra, arquitetura.', en: 'Backup for your team: legacy, AWS, infra cost, architecture.' },
		forWhom: {
			pt: 'CTO ou time que precisa de reforço sênior: resgatar legado, migrar pra AWS/GCP, derrubar custo de infra, revisar arquitetura antes de crescer.',
			en: 'CTOs or teams that need senior reinforcement: rescue legacy code, migrate to AWS/GCP, cut infra cost, review architecture before scaling.',
		},
		outcome: {
			pt: 'Auditoria: relatório de dívida técnica com plano priorizado em 5 dias úteis. Pacote mensal: horas fixas, PRs revisados, pareamento com o time. Stack de casa: TypeScript, React/Vue/Next/Nuxt/Astro, Node, C#, AWS.',
			en: 'Audit: tech-debt report with a prioritized plan in 5 business days. Monthly package: fixed hours, reviewed PRs, pairing with the team. Home stack: TypeScript, React/Vue/Next/Nuxt/Astro, Node, C#, AWS.',
		},
		priceFrom: 0,
		timeline: { pt: 'auditoria em 1 semana · pacote mensal', en: 'audit in 1 week · monthly package' },
		timelineShort: { pt: 'auditoria em 1 semana', en: 'audit in 1 week' },
		hue: '#16a34a',
		icon: 'shield-check',
		preview: {
			image: 'pulsar',
			label: { pt: 'Pulsar', en: 'Pulsar' },
			href: '/work',
		},
	},
];
