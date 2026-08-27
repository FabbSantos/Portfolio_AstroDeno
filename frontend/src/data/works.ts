/**
 * Source of truth for the portfolio list. Replaces the dead Deno API +
 * FALLBACK + per-work translation keys + work.json (all removed).
 *
 * `kind` drives where a work shows up:
 *  - 'flagship' — own products (Pulsar, Quasar). Pinned first.
 *  - 'client'   — shipped for a company. The "Cases" group.
 *  - 'lab'      — challenges / experiments. The "Lab" group, collapsed by default.
 *
 * `outcome` is optional on purpose: a case only shows numbers when you have
 * them. Never publish placeholders.
 */
import type { ImageMetadata } from 'astro';
import type { Bi } from './site';

import imgMirage from '../assets/works/mirage-ibirapuera.png';
import imgFiladelfo from '../assets/works/filadelfo-vila-nova-concei-o.png';
import imgViewPinheiros from '../assets/works/view-pinheiros-by-passareli.png';
import imgVilaOlimpia from '../assets/works/vila-olimpia.png';
import imgVuedex from '../assets/works/vuedex.png';
import imgRestCountries from '../assets/works/rest-countries-api-with-color-theme-switcher.png';
import imgLeadster from '../assets/works/leadster-less-chat-more-conversion.png';
import imgPhilosophy from '../assets/works/phil-s-osophy.png';
import imgRpsls from '../assets/works/rock-paper-scissors-lizard-spock.png';
import imgChatApp from '../assets/works/frontend-mentor-chat-app-css-illustration.png';
import imgTheXp from '../assets/works/the-xp.png';
import imgPulsar from '../assets/featured/pulsar_dash.png';
import imgQuasar from '../assets/featured/quasar_dash.png';
import imgNexus from '../assets/featured/nexus.png';

export type WorkKind = 'flagship' | 'client' | 'lab';
export type WorkStatus = 'live' | 'archived' | 'nda' | 'beta';

export interface Work {
	id: string;
	title: string;
	kind: WorkKind;
	status: WorkStatus;
	/** Public URL. Empty string = no public link yet (UI shows a "request access" CTA). */
	href: string;
	/** Short line under the title. */
	desc: Bi;
	/** What you did (role) — shown in cases. */
	role?: Bi;
	/** Measurable result. Leave undefined until you have a real number. */
	outcome?: Bi;
	client?: string;
	year?: string;
	tags: string[];
	image?: ImageMetadata;
}

export const WORKS: Work[] = [
	// ===== Flagships =====
	{
		id: 'pulsar',
		title: 'Pulsar',
		kind: 'flagship',
		status: 'live',
		href: '', // TODO(fab): URL pública do Pulsar
		desc: {
			pt: 'Observabilidade pra Node — logs, métricas e alertas com um npm que encaixa em pino ou console.log. Versão C# em seguida.',
			en: 'Observability for Node — logs, metrics and alerts from an npm that plugs into pino or console.log. C# version next.',
		},
		role: { pt: 'Produto próprio · design, backend e frontend', en: 'Own product · design, backend and frontend' },
		tags: ['node', 'npm', 'typescript', 'observability'],
		image: imgPulsar,
	},
	{
		id: 'quasar',
		title: 'Quasar',
		kind: 'flagship',
		status: 'live',
		href: '', // TODO(fab): URL pública do Quasar
		desc: {
			pt: 'Plataforma de campanhas em massa por WhatsApp: automações por fluxo, agenda e integrações nativas com Calendar e CRMs.',
			en: 'Mass WhatsApp campaign platform: flow-based automations, scheduling and native Calendar/CRM integrations.',
		},
		role: { pt: 'Produto próprio · sistema completo, do banco à UI', en: 'Own product · full system, database to UI' },
		tags: ['whatsapp', 'next', 'node', 'typescript'],
		image: imgQuasar,
	},

	// ===== Client work (cases) =====
	{
		id: 'nexus-comunicacao',
		title: 'Nexus Comunicação',
		kind: 'client',
		status: 'live',
		href: 'https://app.nexuscomunicacao.com.br',
		client: 'Nexus Comunicação',
		year: '2025',
		desc: {
			pt: 'Plataforma multicanal de comunicação (SMS, WhatsApp, RCS): painel do cliente, API, filas e infra AWS — liderada ponta a ponta como Tech Lead.',
			en: 'Multichannel communication platform (SMS, WhatsApp, RCS): customer dashboard, API, queues and AWS infra — led end to end as Tech Lead.',
		},
		role: { pt: 'Tech Lead · arquitetura, time e entrega', en: 'Tech Lead · architecture, team and delivery' },
		tags: ['next', 'nuxt', 'node', 'typescript', 'aws', 'redis'],
		image: imgNexus,
	},
	{
		id: 'filadelfo',
		title: 'Filadelfo Vila Nova Conceição',
		kind: 'client',
		status: 'live',
		href: 'https://conx.com.br/filadelfo/',
		client: 'Conx',
		desc: {
			pt: 'Site de lançamento imobiliário em Vila Nova Conceição, SP — rápido no celular, feito pra gerar visita ao decorado.',
			en: 'Real-estate launch site in Vila Nova Conceição, São Paulo — fast on mobile, built to book showroom visits.',
		},
		role: { pt: 'Frontend · Astro + Tailwind', en: 'Frontend · Astro + Tailwind' },
		tags: ['astro', 'tailwindcss', 'typescript'],
		image: imgFiladelfo,
	},
	{
		id: 'view-pinheiros',
		title: 'View Pinheiros by Passareli',
		kind: 'client',
		status: 'live',
		href: 'https://viewpinheirosbypassarelli.com.br/',
		client: 'Passareli',
		desc: {
			pt: 'Landing de empreendimento residencial a metros da estação Pinheiros — galeria, plantas e captação de lead.',
			en: 'Residential development landing steps from Pinheiros station — gallery, floor plans and lead capture.',
		},
		role: { pt: 'Frontend · Astro + Tailwind', en: 'Frontend · Astro + Tailwind' },
		tags: ['astro', 'tailwindcss', 'typescript'],
		image: imgViewPinheiros,
	},
	{
		id: 'vila-olimpia',
		title: 'Vila Olímpia by Passareli',
		kind: 'client',
		status: 'live',
		href: 'https://vilaolimpiabypassarelli.com.br/',
		client: 'Passareli',
		desc: {
			pt: 'Site institucional de empreendimento residencial em Vila Olímpia, SP.',
			en: 'Institutional site for a residential development in Vila Olímpia, São Paulo.',
		},
		role: { pt: 'Frontend · Astro + React', en: 'Frontend · Astro + React' },
		tags: ['astro', 'react', 'tailwindcss', 'typescript'],
		image: imgVilaOlimpia,
	},
	{
		id: 'mirage-ibirapuera',
		title: 'Mirage Ibirapuera',
		kind: 'client',
		status: 'archived',
		href: '', // site offline (DNS não resolve mais)
		desc: {
			pt: 'Site institucional de empreendimento a poucos metros do Parque Ibirapuera, SP. Laravel + Sass + Bootstrap.',
			en: 'Institutional site for a development a few meters from Ibirapuera Park, São Paulo. Laravel + Sass + Bootstrap.',
		},
		role: { pt: 'Full stack · Laravel', en: 'Full stack · Laravel' },
		tags: ['laravel', 'php', 'sass', 'bootstrap'],
		image: imgMirage,
	},

	// ===== Lab / challenges =====
	{
		id: 'vuedex',
		title: 'Vuedex',
		kind: 'lab',
		status: 'live',
		href: 'https://vue-dex-lac.vercel.app/',
		desc: {
			pt: 'Pokédex em Vue 3 + Vite — busca, filtros, scroll infinito, testes e múltiplos idiomas.',
			en: 'Vue 3 + Vite Pokédex — search, filters, infinite scroll, tests and multi-language.',
		},
		tags: ['vue 3', 'typescript', 'vite'],
		image: imgVuedex,
	},
	{
		id: 'rest-countries',
		title: 'REST Countries · theme switcher',
		kind: 'lab',
		status: 'live',
		href: 'https://countries-eosin-one.vercel.app/',
		desc: {
			pt: 'Desafio Frontend Mentor — consumidor da REST Countries API com tema claro/escuro.',
			en: 'Frontend Mentor challenge — REST Countries API consumer with light/dark theme.',
		},
		tags: ['vue 3', 'vuetify', 'vite', 'typescript'],
		image: imgRestCountries,
	},
	{
		id: 'leadster-challenge',
		title: 'Leadster — Less Chat, More Conversion',
		kind: 'lab',
		status: 'live',
		href: 'https://leadster-lp-sand.vercel.app/',
		desc: {
			pt: 'Desafio técnico pra Leadster — vídeos do YouTube com filtro por tag. Next + Styled Components.',
			en: 'Code challenge for Leadster — YouTube videos with tag filtering. Next + Styled Components.',
		},
		tags: ['next', 'styled components', 'typescript'],
		image: imgLeadster,
	},
	{
		id: 'philosophy',
		title: "Phil's-osophy",
		kind: 'lab',
		status: 'live',
		href: 'https://phil-osophy.netlify.app/',
		desc: {
			pt: 'Frases aleatórias de Modern Family com share no Twitter e áudio. API em C#.',
			en: 'Random Modern Family quotes with Twitter share and audio playback. API in C#.',
		},
		tags: ['html', 'css', 'c#'],
		image: imgPhilosophy,
	},
	{
		id: 'rpsls',
		title: 'Rock, Paper, Scissors, Lizard, Spock',
		kind: 'lab',
		status: 'live',
		href: 'https://rpsls-nu.vercel.app/',
		desc: {
			pt: 'Desafio Frontend Mentor — o jogo clássico com duas jogadas extras. Vue 3.',
			en: 'Frontend Mentor challenge — the classic game with two extra moves. Vue 3.',
		},
		tags: ['vue 3', 'typescript', 'css', 'vite'],
		image: imgRpsls,
	},
	{
		id: 'chat-app-css',
		title: 'Chat app CSS illustration',
		kind: 'lab',
		status: 'live',
		href: 'https://chat-app-lac-alpha.vercel.app/',
		desc: {
			pt: 'Ilustração de UI de um chat construída só com HTML e CSS.',
			en: 'A chat UI illustration built entirely with HTML and CSS.',
		},
		tags: ['html', 'css'],
		image: imgChatApp,
	},
	{
		id: 'the-xp',
		title: 'The XP',
		kind: 'lab',
		status: 'live',
		href: 'https://thexp.netlify.app/',
		desc: {
			pt: 'Landing page pra um festival de música no metaverso. React + Tailwind + Framer Motion.',
			en: 'Landing page for a metaverse music festival. React + Tailwind + Framer Motion.',
		},
		tags: ['react', 'tailwindcss', 'framer-motion'],
		image: imgTheXp,
	},
];

export const flagships = () => WORKS.filter((w) => w.kind === 'flagship');
export const cases = () => WORKS.filter((w) => w.kind === 'client');
export const lab = () => WORKS.filter((w) => w.kind === 'lab');
/** Home list: flagships + client cases (no lab). */
export const homeWorks = (limit = 6) => WORKS.filter((w) => w.kind !== 'lab').slice(0, limit);
export const getWork = (id: string) => WORKS.find((w) => w.id === id);
