/**
 * Curated "featured" projects shown in the home DeviceShowcase rotator.
 *
 * Decoupled from the works API on purpose — the showcase is an editorial pick.
 * Source data lives in backend/models/work.json; these are 3 hand-picked
 * highlights that read well as full-screen device scenes.
 *
 * TODO(fab): swap these for Pulsar, Quasar and one of the templates once
 * they're ready to show — those are the future flagships.
 */
export interface FeaturedProject {
	id: string;
	/** Short tag shown above the title (mono, uppercase). e.g. "Frontend · React" */
	badge: string;
	/** Project name shown as the big headline. */
	title: string;
	/** One-sentence description shown below the title. */
	desc: string;
	/** Domain shown in the browser-mock URL bar. */
	url: string;
	/** Optional CTA link (opens in a new tab). */
	href?: string;
	/** Optional screenshot. Drop the file in /public/featured/ and reference
	 *  it as "/featured/yourfile.webp". When provided, it fills the scene with
	 *  a dark gradient overlay and the text sits on top. */
	image?: string;
	/** Optional pinned tint — leave undefined to let the component cycle tints. */
	tint?: 't0' | 't1' | 't2';
	/** Stronger full-image dark overlay — use when the source image already has
	 *  its own headline/copy that competes with the rotator text. */
	dim?: boolean;
}

export const featured: FeaturedProject[] = [
	{
		id: 'pulsar',
		badge: 'SaaS · Observability',
		title: 'Pulsar',
		desc: 'Observability npm for Node — plugs into pino or console.log. C# version coming next.',
		url: 'pulsar.dev',
		// href: '',  // currently on a test client domain — no public URL yet
		image: '/featured/pulsar_dash.png',
		// alt available: '/featured/pulsar_live.png' (busier live-stream view)
	},
	{
		id: 'quasar',
		badge: 'SaaS · WhatsApp marketing',
		title: 'Quasar',
		desc: 'Mass campaigns, flow-based automations and native integrations with Calendar, CRMs and more.',
		url: 'quasar.app',
		// href: '',  // currently on a test client domain — no public URL yet
		image: '/featured/quasar_dash.png',
		// alt available: '/featured/quasar.png' (Campaigns list view)
	},
	{
		id: 'nexus',
		badge: 'Tech Lead · Full stack',
		title: 'Nexus Comunicação',
		desc: 'Multi-channel communication platform built end-to-end as Tech Lead — one of the biggest systems I have shipped.',
		url: 'nexuscomunicacao.com.br',
		href: 'https://app.nexuscomunicacao.com.br',  // confirm + uncomment
		image: '/featured/nexus.png',
	},
	{
		id: 'mirante',
		badge: 'Template · Real estate',
		title: 'Mirante',
		desc: 'Brazilian-style real-estate launch landing — built to convert visits into scheduled tours.',
		url: 'mirantepinheiros.com.br',
		href: '/templates/mirante',
		image: '/featured/mirante.png',
	},
	{
		id: 'filadelfo',
		badge: 'Frontend · Real estate',
		title: 'Filadelfo Vila Nova Conceição',
		desc: 'Residential building with view to Ibirapuera Park. Astro + Tailwind.',
		url: 'conx.com.br/filadelfo',
		href: 'https://conx.com.br/filadelfo/',
		image: '/featured/filadelfo.png',
		dim: true,
	},
	{
		id: 'vila-olimpia',
		badge: 'Frontend · Real estate',
		title: 'Vila Olímpia',
		desc: 'Institutional site for a residential development in Vila Olímpia, São Paulo.',
		url: 'vilaolimpiabypassarelli.com.br',
		href: 'https://vilaolimpiabypassarelli.com.br/',
		image: '/featured/vilaolimpia.png',
		dim: true,
	},
];
