/**
 * Productized services shown on the home page (and referenced by the contact
 * form's "what do you need" select).
 *
 * TODO(fab): every `priceFrom` here is a proposal from the audit, not a
 * confirmed number. Adjust or set to 0 to hide the price on that card.
 */
import type { Bi } from './site';

export interface Service {
	id: string;
	name: Bi;
	forWhom: Bi;
	outcome: Bi;
	/** BRL. 0 = don't show a price. */
	priceFrom: number;
	timeline: Bi;
}

export const SERVICES: Service[] = [
	{
		id: 'landing',
		name: { pt: 'Landing page que gera lead', en: 'Landing page that generates leads' },
		forWhom: {
			pt: 'Lançamento imobiliário, campanha, produto novo, evento. Quem tem mídia rodando e precisa da página no ar essa semana.',
			en: 'Real-estate launch, campaign, new product, event. Anyone with ads running who needs the page live this week.',
		},
		outcome: {
			pt: 'Página no seu domínio com formulário + WhatsApp integrados, SEO técnico, Lighthouse acima de 95, analytics configurado e 3 meses de ajustes. Template: você escolhe, eu troco marca, cores e copy. Sob medida: estrutura pensada pro seu funil.',
			en: 'Page on your domain with form + WhatsApp wired, technical SEO, Lighthouse above 95, analytics set up and 3 months of adjustments. Template: you pick, I swap brand, colors and copy. Custom: structure designed for your funnel.',
		},
		priceFrom: 3500,
		timeline: { pt: 'template em 3–5 dias úteis · sob medida em 2–3 semanas', en: 'template in 3–5 business days · custom in 2–3 weeks' },
	},
	{
		id: 'site',
		name: { pt: 'Site institucional ou portal', en: 'Institutional site or portal' },
		forWhom: {
			pt: 'Construtoras, clínicas, consultorias e empresas que ainda mandam cliente pro Instagram porque o site não convence.',
			en: 'Developers, clinics, consultancies and companies still sending clients to Instagram because the site doesn’t convince.',
		},
		outcome: {
			pt: 'Site completo, rápido no celular, com CMS pra sua equipe editar (ou estático, custo zero de hospedagem). Domínio, SSL, analytics e mapa de conversão — como fiz pra Conx e Passareli.',
			en: 'Complete site, fast on mobile, with a CMS for your team (or static, zero hosting cost). Domain, SSL, analytics and conversion map — like I did for Conx and Passareli.',
		},
		priceFrom: 9000,
		timeline: { pt: '3–5 semanas', en: '3–5 weeks' },
	},
	{
		id: 'system',
		name: { pt: 'Sistema web ou MVP', en: 'Web system or MVP' },
		forWhom: {
			pt: 'Founder com produto na cabeça e processo na planilha; empresa que precisa de dashboard, ferramenta interna ou SaaS sem contratar time.',
			en: 'Founders with a product in their head and a process in a spreadsheet; companies that need a dashboard, internal tool or SaaS without hiring a team.',
		},
		outcome: {
			pt: 'Fase 1 no ar: login, banco, telas principais, deploy na AWS (ou onde você já está), documentação e repositório seu. Escopo fechado por fase, preview semanal. Mesma pegada da plataforma multicanal da Nexus.',
			en: 'Phase 1 live: auth, database, core screens, AWS deploy (or wherever you are), docs and your own repo. Fixed scope per phase, weekly previews. Same approach as Nexus’ multichannel platform.',
		},
		priceFrom: 25000,
		timeline: { pt: 'primeira fase em 4–8 semanas', en: 'first phase in 4–8 weeks' },
	},
	{
		id: 'ai',
		name: { pt: 'IA dentro do seu produto', en: 'AI inside your product' },
		forWhom: {
			pt: 'SaaS, atendimento ou marketing que quer agente/automação de verdade (WhatsApp, e-mail, documentos) — não um chatbot de FAQ.',
			en: 'SaaS, support or marketing teams that want real agents/automation (WhatsApp, email, documents) — not a FAQ chatbot.',
		},
		outcome: {
			pt: 'Piloto com dados reais: agente com memória, ferramentas e limites, integrado ao que você já usa. OpenAI, Anthropic, Gemini ou self-hosted — escolhido pelo seu custo e sua LGPD. Relatório de custo por conversa antes de escalar.',
			en: 'Pilot on real data: agent with memory, tools and guardrails, integrated with what you already use. OpenAI, Anthropic, Gemini or self-hosted — chosen for your cost and compliance. Cost-per-conversation report before scaling.',
		},
		priceFrom: 12000,
		timeline: { pt: 'piloto em 2–4 semanas', en: 'pilot in 2–4 weeks' },
	},
	{
		id: 'senior',
		name: { pt: 'Sênior sob demanda', en: 'Senior on demand' },
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
	},
];
