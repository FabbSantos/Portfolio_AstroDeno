/**
 * Editorial picks for the home FeaturedFlow (the drifting columns in the hero). Images are imported
 * from src/assets so astro:assets optimizes them (webp, srcset, immutable cache).
 *
 * Order matters: scene 0 is the LCP image and the first thing a visitor sees.
 */
import type { ImageMetadata } from 'astro';
import type { Bi } from './site';
import pulsar from '../assets/featured/pulsar_dash.png';
import quasar from '../assets/featured/quasar_dash.png';
import nexus from '../assets/featured/nexus.png';
import mirante from '../assets/featured/mirante.png';
import filadelfo from '../assets/featured/filadelfo.png';
import vilaolimpia from '../assets/featured/vilaolimpia.png';

export interface FeaturedProject {
	id: string;
	badge: Bi;
	title: string;
	desc: Bi;
	/** Small mono line under the screenshot. Use a real host or a neutral label,
	 *  never a domain you don't own. */
	urlLabel: Bi;
	/** Optional link. External links open in a new tab; internal ones are locale-prefixed. */
	href?: string;
	image: ImageMetadata;
	alt: Bi;
	tint?: 't0' | 't1' | 't2';
}

export const featured: FeaturedProject[] = [
	{
		id: 'pulsar',
		badge: { pt: 'Produto · Observabilidade', en: 'Product · Observability', es: 'Producto · Observabilidad' },
		title: 'Pulsar',
		desc: {
			pt: 'Observabilidade pra Node: logs, métricas e alertas com um npm que encaixa em pino ou console.log.',
			en: 'Observability for Node: logs, metrics and alerts from an npm that plugs into pino or console.log.',
			es: 'Observabilidad para Node: logs, métricas y alertas con un npm que se integra con pino o console.log.',
		},
		urlLabel: { pt: 'pulsar · produto próprio', en: 'pulsar · own product', es: 'pulsar · producto propio' },
		// TODO(fab): href pública do Pulsar
		image: pulsar,
		alt: { pt: 'Dashboard do Pulsar com métricas de logs', en: 'Pulsar dashboard with log metrics', es: 'Dashboard de Pulsar con métricas de logs' },
	},
	{
		id: 'quasar',
		badge: { pt: 'Produto · Marketing por WhatsApp', en: 'Product · WhatsApp marketing', es: 'Producto · Marketing por WhatsApp' },
		title: 'Quasar',
		desc: {
			pt: 'Campanhas em massa, automações por fluxo e integrações nativas com Calendar e CRMs.',
			en: 'Mass campaigns, flow-based automations and native Calendar/CRM integrations.',
			es: 'Campañas masivas, automatizaciones por flujo e integraciones nativas con Calendar y CRMs.',
		},
		urlLabel: { pt: 'quasar · produto próprio', en: 'quasar · own product', es: 'quasar · producto propio' },
		// TODO(fab): href pública do Quasar
		image: quasar,
		alt: { pt: 'Painel de campanhas do Quasar', en: 'Quasar campaigns dashboard', es: 'Panel de campañas de Quasar' },
	},
	{
		id: 'nexus',
		badge: { pt: 'Tech Lead · Plataforma multicanal', en: 'Tech Lead · Multichannel platform', es: 'Tech Lead · Plataforma multicanal' },
		title: 'Nexus Comunicação',
		desc: {
			pt: 'SMS, WhatsApp e RCS num painel só. Painel, API, filas e infra AWS, liderados ponta a ponta.',
			en: 'SMS, WhatsApp and RCS in one dashboard. Dashboard, API, queues and AWS infra, led end to end.',
			es: 'SMS, WhatsApp y RCS en un solo panel. Panel, API, colas e infra en AWS, liderados de principio a fin.',
		},
		urlLabel: { pt: 'app.nexuscomunicacao.com.br', en: 'app.nexuscomunicacao.com.br', es: 'app.nexuscomunicacao.com.br' },
		href: 'https://app.nexuscomunicacao.com.br',
		image: nexus,
		alt: { pt: 'Painel da plataforma Nexus Comunicação', en: 'Nexus Comunicação platform dashboard', es: 'Panel de la plataforma Nexus Comunicação' },
	},
	{
		id: 'filadelfo',
		badge: { pt: 'Frontend · Imobiliário', en: 'Frontend · Real estate', es: 'Frontend · Inmobiliario' },
		title: 'Filadelfo Vila Nova Conceição',
		desc: {
			pt: 'Lançamento residencial com vista pro Parque Ibirapuera. Astro + Tailwind.',
			en: 'Residential launch overlooking Ibirapuera Park. Astro + Tailwind.',
			es: 'Lanzamiento residencial con vista al Parque Ibirapuera. Astro + Tailwind.',
		},
		urlLabel: { pt: 'conx.com.br/filadelfo', en: 'conx.com.br/filadelfo', es: 'conx.com.br/filadelfo' },
		href: 'https://conx.com.br/filadelfo/',
		image: filadelfo,
		alt: { pt: 'Site do Filadelfo Vila Nova Conceição', en: 'Filadelfo Vila Nova Conceição website', es: 'Sitio web de Filadelfo Vila Nova Conceição' },
	},
	{
		id: 'vila-olimpia',
		badge: { pt: 'Frontend · Imobiliário', en: 'Frontend · Real estate', es: 'Frontend · Inmobiliario' },
		title: 'Vila Olímpia by Passareli',
		desc: {
			pt: 'Site institucional de empreendimento residencial em Vila Olímpia, São Paulo.',
			en: 'Institutional site for a residential development in Vila Olímpia, São Paulo.',
			es: 'Sitio institucional de un proyecto residencial en Vila Olímpia, São Paulo.',
		},
		urlLabel: { pt: 'vilaolimpiabypassarelli.com.br', en: 'vilaolimpiabypassarelli.com.br', es: 'vilaolimpiabypassarelli.com.br' },
		href: 'https://vilaolimpiabypassarelli.com.br/',
		image: vilaolimpia,
		alt: { pt: 'Site do Vila Olímpia by Passareli', en: 'Vila Olímpia by Passareli website', es: 'Sitio web de Vila Olímpia by Passareli' },
	},
	{
		id: 'mirante',
		badge: { pt: 'Template · Imobiliário', en: 'Template · Real estate', es: 'Plantilla · Inmobiliario' },
		title: 'Mirante',
		desc: {
			pt: 'Landing de lançamento imobiliário no padrão BR. Feita pra converter visita em call com corretor.',
			en: 'Brazilian-style real-estate launch landing. Built to convert visits into scheduled tours.',
			es: 'Landing de lanzamiento inmobiliario al estilo brasileño. Hecha para convertir visitas en llamadas con un asesor.',
		},
		urlLabel: { pt: 'template · demo', en: 'template · demo', es: 'plantilla · demo' },
		href: '/templates/mirante',
		image: mirante,
		alt: { pt: 'Demo do template Mirante', en: 'Mirante template demo', es: 'Demo de la plantilla Mirante' },
	},
];
