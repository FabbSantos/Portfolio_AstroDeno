/**
 * Server-side works loader. Fetches the real portfolio API and normalizes it
 * into a stable shape. Falls back to a curated list of real projects if the
 * API is empty or unreachable, so the UI never renders blank.
 */
export interface PortfolioWork {
	id: number | string;
	title: string;
	desc: string;
	/** Optional i18n key to swap `desc` on locale change. Falls back to `desc`
	 *  when missing — handy for API rows that don't have a curated translation. */
	descKey?: string;
	href?: string;
	image?: string;
	live: boolean;
	status: 'live' | 'archived' | 'nda' | 'beta';
	year?: string;
	tags: string[];
	type: string[];
}

const API_URL = 'https://fabb-portfolio.deno.dev/works';

/**
 * Curated baseline list — sourced from backend/models/work.json. Used when the
 * API is unreachable AND merged into API responses so every row has a `type`
 * for filtering. Add more here as you ship new things.
 */
const FALLBACK: PortfolioWork[] = [
	{
		id: 'pulsar',
		title: 'Pulsar',
		desc:
			'Observability npm for Node — plugs into pino or console.log. C# version coming next.',
		descKey: 'works.pulsar.desc',
		live: false,
		status: 'beta',
		tags: ['node', 'npm', 'typescript', 'observability'],
		type: ['personal'],
	},
	{
		id: 'quasar',
		title: 'Quasar',
		desc:
			'Mass campaigns, flow-based automations and native integrations with Calendar, CRMs and more.',
		descKey: 'works.quasar.desc',
		live: false,
		status: 'beta',
		tags: ['whatsapp', 'next', 'node', 'typescript'],
		type: ['personal'],
	},
	{
		id: 'nexus-comunicacao',
		title: 'Nexus Comunicação',
		desc:
			'Multi-channel communication platform built end-to-end as Tech Lead — one of the biggest systems I have shipped.',
		descKey: 'works.nexus.desc',
		href: 'https://app.nexuscomunicacao.com.br',
		live: true,
		status: 'live',
		tags: ['next', 'node', 'typescript', 'react'],
		type: ['professional'],
	},
	{
		id: 'mirage-ibirapuera',
		title: 'Mirage Ibirapuera',
		desc:
			'Institutional site for a real-estate development integrating nature, exclusivity and sophistication — a few meters from Ibirapuera Park, São Paulo.',
		descKey: 'works.mirage.desc',
		href: 'https://mirageibirapuera-moema.com.br/',
		live: false,
		status: 'archived',
		tags: ['laravel', 'php', 'sass', 'bootstrap'],
		type: ['professional'],
	},
	{
		id: 'filadelfo',
		title: 'Filadelfo Vila Nova Conceição',
		desc:
			'Residential building in Vila Nova Conceição, São Paulo — close to Ibirapuera Park. Built in Astro + Tailwind.',
		descKey: 'works.filadelfo.desc',
		href: 'https://conx.com.br/filadelfo/',
		live: true,
		status: 'live',
		tags: ['astro', 'tailwindcss', 'typescript'],
		type: ['professional'],
	},
	{
		id: 'view-pinheiros',
		title: 'View Pinheiros by Passareli',
		desc:
			"An inspiring residential project a few meters from Pinheiros Station, in one of São Paulo's most complete neighborhoods.",
		descKey: 'works.viewPinheiros.desc',
		href: 'https://viewpinheirosbypassarelli.com.br/',
		live: true,
		status: 'live',
		tags: ['astro', 'tailwindcss', 'typescript'],
		type: ['professional'],
	},
	{
		id: 'vila-olimpia',
		title: 'Vila Olímpia',
		desc: 'Institutional site for a residential development in Vila Olímpia, São Paulo.',
		descKey: 'works.vilaOlimpia.desc',
		href: 'https://vilaolimpiabypassarelli.com.br/',
		live: true,
		status: 'live',
		tags: ['astro', 'react', 'tailwind', 'typescript'],
		type: ['professional'],
	},
	{
		id: 'vuedex',
		title: 'Vuedex',
		desc:
			'A Pokédex in Vue 3 + Vite — search, type/name/specie filters, infinite scroll, tests and multi-language support.',
		descKey: 'works.vuedex.desc',
		href: 'https://vue-dex-lac.vercel.app/',
		live: true,
		status: 'live',
		tags: ['vue 3', 'typescript', 'vite'],
		type: ['personal', 'challenge', 'technical challenge'],
	},
	{
		id: 'rest-countries',
		title: 'REST Countries API with theme switcher',
		desc:
			'Frontend Mentor challenge — REST Countries API consumer with a light/dark theme switcher.',
		descKey: 'works.restCountries.desc',
		href: 'https://countries-eosin-one.vercel.app/',
		live: true,
		status: 'live',
		tags: ['vue 3', 'vuetify', 'vite', 'typescript'],
		type: ['personal', 'challenge'],
	},
	{
		id: 'leadster-challenge',
		title: 'Leadster — Less Chat, More Conversion',
		desc:
			'Code challenge for Leadster — surfaces their YouTube videos with tag filtering. Built in Next + Styled Components.',
		descKey: 'works.leadster.desc',
		href: 'https://leadster-lp-sand.vercel.app/',
		live: true,
		status: 'live',
		tags: ['next', 'styled components', 'typescript'],
		type: ['personal', 'challenge'],
	},
	{
		id: 'philosophy',
		title: "Phil's-osophy",
		desc:
			'Random quotes from Modern Family — Twitter share and audio playback included. API built in C#.',
		descKey: 'works.philosophy.desc',
		href: 'https://phil-osophy.netlify.app/',
		live: true,
		status: 'live',
		tags: ['html', 'css', 'c#'],
		type: ['personal', 'challenge'],
	},
	{
		id: 'rpsls',
		title: 'Rock, Paper, Scissors, Lizard, Spock',
		desc:
			'Frontend Mentor challenge — the classic game with two extra moves. Built in Vue 3.',
		descKey: 'works.rpsls.desc',
		href: 'https://rpsls-nu.vercel.app/',
		live: true,
		status: 'live',
		tags: ['vue 3', 'typescript', 'css', 'vite'],
		type: ['personal', 'challenge'],
	},
	{
		id: 'chat-app-css',
		title: 'Frontend Mentor — Chat app CSS illustration',
		desc: 'A ChatApp UI illustration built entirely with HTML and CSS.',
		descKey: 'works.chatApp.desc',
		href: 'https://chat-app-lac-alpha.vercel.app/',
		live: true,
		status: 'live',
		tags: ['html', 'css'],
		type: ['personal', 'challenge'],
	},
	{
		id: 'the-xp',
		title: 'The XP',
		desc: 'Landing page for a metaverse music festival. React + TailwindCSS + Framer Motion.',
		descKey: 'works.theXp.desc',
		href: 'https://thexp.netlify.app/',
		live: true,
		status: 'live',
		tags: ['react', 'tailwindcss', 'framer-motion'],
		type: ['personal', 'project'],
	},
];

/**
 * Manual overrides applied after the API normalize step — for works whose
 * upstream JSON is out of date. Keyed by fuzzy-normalized title.
 */
const OVERRIDES: Record<string, Partial<PortfolioWork>> = {
	// Mirage went offline — flag as archived even though the API still says live.
	mirageibirapuera: { live: false, status: 'archived' },
};

const norm = (s: string) =>
	s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '');

/** Look up a curated entry by fuzzy title match (so the API can return slightly
 *  different titles and still pick up its `type`). */
function findCurated(title: string): PortfolioWork | undefined {
	const key = norm(title);
	return FALLBACK.find(
		(c) => norm(c.title) === key || key.includes(norm(c.title)) || norm(c.title).includes(key)
	);
}

interface ApiWork {
	id?: number | string;
	title?: string;
	fadeText?: string;
	body?: string;
	image?: string;
	href?: string;
	live?: boolean;
	status?: string;
	year?: string | number;
	tags?: string[];
	type?: string | string[];
}

function normalize(w: ApiWork, i: number): PortfolioWork {
	const live = Boolean(w.live);
	const apiType = Array.isArray(w.type) ? w.type : w.type ? [String(w.type)] : [];
	const title = String(w.title ?? 'Untitled');
	const curated = findCurated(title);
	// Normalize types to lowercase so the filter (which expects "personal" /
	// "professional") matches values like "Professional", "Personal Challenge".
	const type = (apiType.length ? apiType : curated?.type ?? ['professional']).map((s) =>
		String(s).toLowerCase()
	);
	const base: PortfolioWork = {
		id: w.id ?? i,
		title,
		desc: String(w.fadeText ?? w.body ?? curated?.desc ?? ''),
		descKey: curated?.descKey,
		href: typeof w.href === 'string' ? w.href : curated?.href,
		image:
			typeof w.image === 'string' && w.image.startsWith('http') ? w.image : undefined,
		live,
		status: (w.status as PortfolioWork['status']) ?? (live ? 'live' : curated?.status ?? 'archived'),
		year: w.year ? String(w.year) : curated?.year,
		tags: Array.isArray(w.tags) && w.tags.length ? w.tags.map(String) : curated?.tags ?? [],
		type,
	};
	// Apply manual override last so stale API rows can be force-archived etc.
	const override = OVERRIDES[norm(title)];
	return override ? { ...base, ...override } : base;
}

/** FALLBACK entries pinned to the top of the merged list regardless of API
 *  order — useful for hero/flagship work that should always be visible. */
const PRIORITY_IDS = new Set<string>(['pulsar', 'quasar', 'nexus-comunicacao']);

export async function getWorks(): Promise<PortfolioWork[]> {
	let apiList: PortfolioWork[] = [];
	try {
		const res = await fetch(API_URL);
		const data = await res.json();
		const raw = Array.isArray(data?.works) ? data.works : [];
		apiList = raw.map(normalize);
	} catch {
		/* network failure — fall back to curated list */
	}

	// Pinned items first
	const priority = FALLBACK.filter((c) => PRIORITY_IDS.has(String(c.id)));
	const seen = new Set(priority.map((w) => norm(w.title)));

	// Then API rows (excluding any already pinned)
	const apiFiltered = apiList.filter((w) => !seen.has(norm(w.title)));
	apiFiltered.forEach((w) => seen.add(norm(w.title)));

	// Then any remaining curated extras (dedup by title)
	const extras = FALLBACK.filter((c) => !seen.has(norm(c.title)));

	return [...priority, ...apiFiltered, ...extras];
}

/** Best-effort display domain for the browser mock URL bar. */
export function displayUrl(w: PortfolioWork): string {
	if (w.href) {
		try {
			return new URL(w.href).hostname.replace(/^www\./, '');
		} catch {
			/* ignore */
		}
	}
	return String(w.id)
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '') // strip combining diacritics
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}
