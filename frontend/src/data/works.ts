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
	/** Public packages anyone can install. Listed as links on /work, above the main action. */
	packages?: { registry: 'npm' | 'nuget'; name: string; href: string }[];
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
			pt: 'Observabilidade pra Node: logs, métricas e alertas com um npm que encaixa em pino ou console.log. Versão C# em seguida.',
			en: 'Observability for Node: logs, metrics and alerts from an npm that plugs into pino or console.log. C# version next.',
			es: 'Observabilidad para Node: logs, métricas y alertas con un npm que se integra con pino o console.log. Próximamente, versión en C#.',
		},
		role: { pt: 'Produto próprio · design, backend e frontend', en: 'Own product · design, backend and frontend', es: 'Producto propio · diseño, backend y frontend' },
		tags: ['node', 'npm', 'typescript', 'observability'],
		image: imgPulsar,
		// TODO(fab): pacote C# (NuGet) quando sair
		packages: [
			{ registry: 'npm', name: '@fabbahiense/pulsar-node', href: 'https://www.npmjs.com/package/@fabbahiense/pulsar-node' },
			{ registry: 'npm', name: '@fabbahiense/pulsar-next', href: 'https://www.npmjs.com/package/@fabbahiense/pulsar-next' },
			{ registry: 'npm', name: '@fabbahiense/pulsar-pino-transport', href: 'https://www.npmjs.com/package/@fabbahiense/pulsar-pino-transport' },
		],
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
			es: 'Plataforma de campañas masivas por WhatsApp: automatizaciones por flujo, agenda e integraciones nativas con Calendar y CRMs.',
		},
		role: {
			pt: 'Produto próprio · sistema completo, do banco à UI',
			en: 'Own product · full system, database to UI',
			es: 'Producto propio · sistema completo, de la base de datos a la UI',
		},
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
			pt: 'Plataforma multicanal de comunicação (SMS, WhatsApp, RCS): painel do cliente, API, filas e infra AWS. Liderada ponta a ponta como Tech Lead.',
			en: 'Multichannel communication platform (SMS, WhatsApp, RCS): customer dashboard, API, queues and AWS infra. Led end to end as Tech Lead.',
			es: 'Plataforma multicanal de comunicación (SMS, WhatsApp, RCS): panel del cliente, API, colas e infra en AWS. Liderada de principio a fin como Tech Lead.',
		},
		role: { pt: 'Tech Lead · arquitetura, time e entrega', en: 'Tech Lead · architecture, team and delivery', es: 'Tech Lead · arquitectura, equipo y entrega' },
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
			pt: 'Site de lançamento imobiliário em Vila Nova Conceição, SP. Rápido no celular, feito pra gerar visita ao decorado.',
			en: 'Real-estate launch site in Vila Nova Conceição, São Paulo. Fast on mobile, built to book showroom visits.',
			es: 'Sitio de lanzamiento inmobiliario en Vila Nova Conceição, São Paulo. Rápido en el celular, hecho para generar visitas al departamento modelo.',
		},
		role: { pt: 'Frontend · Astro + Tailwind', en: 'Frontend · Astro + Tailwind', es: 'Frontend · Astro + Tailwind' },
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
			pt: 'Landing de empreendimento residencial a metros da estação Pinheiros. Galeria, plantas e captação de lead.',
			en: 'Residential development landing steps from Pinheiros station. Gallery, floor plans and lead capture.',
			es: 'Landing de un proyecto residencial a metros de la estación Pinheiros. Galería, planos y captación de leads.',
		},
		role: { pt: 'Frontend · Astro + Tailwind', en: 'Frontend · Astro + Tailwind', es: 'Frontend · Astro + Tailwind' },
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
			es: 'Sitio institucional de un proyecto residencial en Vila Olímpia, São Paulo.',
		},
		role: { pt: 'Frontend · Astro + React', en: 'Frontend · Astro + React', es: 'Frontend · Astro + React' },
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
			es: 'Sitio institucional de un proyecto a pocos metros del Parque Ibirapuera, São Paulo. Laravel + Sass + Bootstrap.',
		},
		role: { pt: 'Full stack · Laravel', en: 'Full stack · Laravel', es: 'Full stack · Laravel' },
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
			pt: 'Pokédex em Vue 3 + Vite. Busca, filtros, scroll infinito, testes e múltiplos idiomas.',
			en: 'Vue 3 + Vite Pokédex. Search, filters, infinite scroll, tests and multi-language.',
			es: 'Pokédex en Vue 3 + Vite. Búsqueda, filtros, scroll infinito, tests y varios idiomas.',
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
			pt: 'Desafio Frontend Mentor: consumidor da REST Countries API com tema claro/escuro.',
			en: 'Frontend Mentor challenge: REST Countries API consumer with light/dark theme.',
			es: 'Desafío de Frontend Mentor: consumidor de la REST Countries API con tema claro/oscuro.',
		},
		tags: ['vue 3', 'vuetify', 'vite', 'typescript'],
		image: imgRestCountries,
	},
	{
		id: 'leadster-challenge',
		title: 'Leadster: Less Chat, More Conversion',
		kind: 'lab',
		status: 'live',
		href: 'https://leadster-lp-sand.vercel.app/',
		desc: {
			pt: 'Desafio técnico pra Leadster. Vídeos do YouTube com filtro por tag. Next + Styled Components.',
			en: 'Code challenge for Leadster. YouTube videos with tag filtering. Next + Styled Components.',
			es: 'Desafío técnico para Leadster. Videos de YouTube con filtro por etiqueta. Next + Styled Components.',
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
			es: 'Frases aleatorias de Modern Family para compartir en Twitter y con audio. API en C#.',
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
			pt: 'Desafio Frontend Mentor: o jogo clássico com duas jogadas extras. Vue 3.',
			en: 'Frontend Mentor challenge: the classic game with two extra moves. Vue 3.',
			es: 'Desafío de Frontend Mentor: el juego clásico con dos jugadas extra. Vue 3.',
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
			es: 'Ilustración de la UI de un chat hecha solo con HTML y CSS.',
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
			es: 'Landing page para un festival de música en el metaverso. React + Tailwind + Framer Motion.',
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
