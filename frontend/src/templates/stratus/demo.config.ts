/**
 * Stratus — portfolio demo config. Fictional company, placeholder data.
 * A client's site.config.ts has exactly this shape (see README.md).
 */
import { defineStratus } from './schema';

export default defineStratus({
	brand: {
		name: 'Stratus',
		tagline: 'Analytics, without the friction.',
		locale: 'en',
	},
	theme: { accent: '#0e7c86', bg: '#f6f6f4', bg2: '#ececea', ink: '#101214', radius: 0 },
	seo: {
		title: 'Stratus Planos: template demo',
		description: 'Demo of the Stratus template: B2B SaaS landing by Fab Bahiense. Placeholder data.',
		canonical: 'https://www.fabbahiense.dev/templates/stratus/demo',
	},
	contact: {
		form: { provider: 'none' },
	},
	analytics: {},
	legal: { lines: [] },
	nav: [
		{ label: 'Features', href: '#features' },
		{ label: 'Pricing', href: '#pricing' },
		{ label: 'FAQ', href: '#faq' },
		{ label: 'Docs', href: '#' },
	],

	header: {
		brandHref: '#',
		signIn: { label: 'Sign in', href: '#' },
		cta: { label: 'Start free trial', href: '#cta' },
	},

	hero: {
		pill: { tag: 'v3.0', text: 'Anomaly detection now ships out of the box', href: '#' },
		title: 'Analytics,\n**without the friction.**',
		lead: 'The first analytics platform that configures itself. Plug your stack in 60 seconds. 14-day trial, no credit card, no sales call.',
		primary: { label: 'Start free for 14 days', href: '#cta' },
		secondary: { label: 'Watch the 90s demo', href: '#' },
		socialProof: '★★★★★ **4.9** on G2 · trusted by 600+ engineering teams',
	},

	product: {
		image: null,
		meta: 'app.stratus.io · overview · last 30 days',
		kpis: [
			{ value: '+24.6%', label: 'conversion' },
			{ value: '89,204', label: 'sessions' },
			{ value: '1.4s', label: 'p95 load' },
			{ value: '3.2k', label: 'events / min' },
		],
	},

	logos: {
		title: 'Trusted by',
		items: [{ name: 'Nimbus' }, { name: 'Forma' }, { name: 'Lattice' }, { name: 'Aperture' }, { name: 'Vector' }, { name: 'Quadra' }],
	},

	features: {
		eyebrow: 'Features',
		title: "Everything you need.\n**Nothing you don't.**",
		lead: 'Six things the platform does on day one, without a workshop, a consultant or a 40-page setup guide.',
		items: [
			{ title: 'Setup in 60 seconds', desc: 'Drop in a single snippet. Auto-detects pages, events and conversions on first load.' },
			{ title: 'Compliant by default', desc: 'SOC 2 Type II, GDPR, LGPD. Data stays in the region you choose, no exceptions.' },
			{ title: 'Anomaly detection', desc: 'Statistical models alert you before customers do. Zero config, zero false positives.' },
			{ title: 'Plays well with others', desc: 'Native SDKs for Node, Python, Go, Rust. Webhooks for everything else.' },
			{ title: 'Built for scale', desc: 'Handles 50M events per minute on a single tenant. Your traffic spike is our Tuesday.' },
			{ title: 'Real humans on Slack', desc: 'Shared channel with our engineers. P1 incidents answered in under 5 minutes.' },
		],
	},

	pricing: {
		eyebrow: 'Pricing',
		title: 'Simple, **honest pricing.**',
		lead: '14-day free trial on every plan. Annual saves 20%. No setup fees, ever.',
		toggle: { label: 'Billing period', monthly: 'Monthly', annual: 'Annual', note: '-20%' },
		plans: [
			{
				name: 'Starter',
				price: '$29',
				priceAnnual: '$23',
				period: 'per month',
				desc: 'For solo founders and small teams getting going.',
				cta: { label: 'Start free trial', href: '#' },
				bullets: ['1M events/month', '30-day retention', '5 dashboards', 'Email support'],
			},
			{
				name: 'Growth',
				price: '$129',
				priceAnnual: '$103',
				period: 'per month',
				desc: 'For startups serious about understanding their users.',
				cta: { label: 'Start free trial', href: '#' },
				bullets: ['25M events/month', '1-year retention', 'Unlimited dashboards', 'Anomaly detection', 'Shared Slack channel'],
				featured: true,
				badge: 'Most popular',
			},
			{
				name: 'Scale',
				price: 'Talk to us',
				desc: 'SLA, SSO/SAML, custom data residency and dedicated support.',
				cta: { label: 'Book a call', href: '#' },
				bullets: ['Unlimited events', 'Custom retention', 'SSO/SAML · audit logs', '99.99% SLA', 'Dedicated engineer'],
			},
		],
		compare: {
			rows: [
				{ label: 'Events per month', values: ['1M', '25M', 'Unlimited'] },
				{ label: 'Data retention', values: ['30 days', '1 year', 'Custom'] },
				{ label: 'Dashboards', values: ['5', 'Unlimited', 'Unlimited'] },
				{ label: 'Anomaly detection', values: [false, true, true] },
				{ label: 'Shared Slack channel', values: [false, true, true] },
				{ label: 'SSO / SAML and audit logs', values: [false, false, true] },
				{ label: 'Uptime SLA', values: ['99.9%', '99.9%', '99.99%'] },
				{ label: 'Support', values: ['Email', 'Slack', 'Dedicated engineer'] },
			],
		},
		foot: 'Prices in USD, before tax. Annual plans are billed once a year. Cancel anytime; export everything as Parquet or CSV.',
	},

	faq: {
		eyebrow: 'Questions',
		title: 'The honest **FAQ.**',
		items: [
			{
				q: 'Do I need a credit card to start the trial?',
				a: "No. You give us an email, we give you 14 days. If you don't love it, just close the tab.",
			},
			{
				q: 'How is Stratus different from the rest?',
				a: "Most tools want a 6-hour onboarding workshop. Stratus configures itself from the first request and gives you something useful in under a minute. That's the whole pitch.",
			},
			{
				q: 'Where does my data live?',
				a: "You pick: US, EU, or São Paulo. Data never leaves the region you choose. We're SOC 2 Type II, GDPR and LGPD compliant.",
			},
			{
				q: 'Can I export everything if I leave?',
				a: 'Yes: full historical data as Parquet or CSV, anytime. No lock-in, no hostage data.',
			},
		],
	},

	finalCta: {
		title: 'Stop guessing. **Start knowing.**',
		sub: 'Set up takes a minute. Insight starts the same day.',
		ctas: [
			{ label: 'Start free trial', href: '#' },
			{ label: 'Talk to sales', href: '#' },
		],
	},

	footer: {
		columns: [
			{
				h: 'Product',
				links: [
					{ label: 'Features', href: '#' },
					{ label: 'Pricing', href: '#' },
					{ label: 'Integrations', href: '#' },
					{ label: 'Changelog', href: '#' },
				],
			},
			{
				h: 'Company',
				links: [
					{ label: 'About', href: '#' },
					{ label: 'Customers', href: '#' },
					{ label: 'Blog', href: '#' },
					{ label: 'Careers', href: '#' },
				],
			},
			{
				h: 'Resources',
				links: [
					{ label: 'Docs', href: '#' },
					{ label: 'API', href: '#' },
					{ label: 'Status', href: '#' },
					{ label: 'Security', href: '#' },
				],
			},
		],
		legalLinks: [
			{ label: 'Privacy', href: '#' },
			{ label: 'Terms', href: '#' },
			{ label: 'DPA', href: '#' },
		],
		copyright: '© 2026 Stratus, Inc.',
	},
});
