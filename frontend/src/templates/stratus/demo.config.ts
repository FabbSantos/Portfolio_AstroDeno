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
	theme: { accent: '#ff5c3d', bg: '#fffaf7', ink: '#1a1a1c', radius: 10 },
	seo: {
		title: 'Stratus SaaS — template demo',
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
		pill: { tag: 'NEW', text: 'Stratus 3.0 is here — anomaly detection out of the box', href: '#' },
		title: 'Analytics,\n**without the friction.**',
		lead: 'The first analytics platform that configures itself. Plug your stack in 60 seconds. 14‑day trial, no credit card, no sales call.',
		primary: { label: 'Start free for 14 days', href: '#cta' },
		secondary: { label: '▶ Watch 90s demo', href: '#' },
		socialProof: '★★★★★ **4.9** on G2 · trusted by 600+ engineering teams',
	},

	product: {
		image: null,
		kpis: [{ value: '+24.6%' }, { value: '89,204' }, { value: '1.4s' }, { value: '3.2k' }],
	},

	logos: {
		title: 'Powering analytics at fast-moving companies',
		items: [{ name: 'Nimbus' }, { name: 'Forma' }, { name: 'Lattice' }, { name: 'Aperture' }, { name: 'Vector' }, { name: 'Quadra' }],
	},

	features: {
		eyebrow: '// FEATURES',
		title: "Everything you need.\n**Nothing you don't.**",
		items: [
			{ icon: '⚡', title: 'Setup in 60 seconds', desc: 'Drop in a single snippet. Auto-detects pages, events and conversions on first load.' },
			{ icon: '🔒', title: 'Compliant by default', desc: 'SOC 2 Type II, GDPR, LGPD. Data stays in the region you choose, no exceptions.' },
			{ icon: '🛰', title: 'Anomaly detection', desc: 'Statistical models alert you before customers do. Zero config, zero false positives.' },
			{ icon: '🧩', title: 'Plays well with others', desc: 'Native SDKs for Node, Python, Go, Rust. Webhooks for everything else.' },
			{ icon: '📈', title: 'Built for scale', desc: 'Handles 50M events per minute on a single tenant. Your traffic spike is our Tuesday.' },
			{ icon: '💬', title: 'Real humans on Slack', desc: 'Shared channel with our engineers. P1 incidents answered in under 5 minutes.' },
		],
	},

	pricing: {
		eyebrow: '// PRICING',
		title: 'Simple, **honest pricing.**',
		lead: '14-day free trial on every plan. Annual saves 20%. No setup fees, ever.',
		plans: [
			{
				name: 'Starter',
				price: '$29',
				period: '/mo',
				desc: 'For solo founders and small teams getting going.',
				cta: { label: 'Start free trial', href: '#' },
				bullets: ['1M events/month', '30-day retention', '5 dashboards', 'Email support'],
			},
			{
				name: 'Growth',
				price: '$129',
				period: '/mo',
				desc: 'For startups serious about understanding their users.',
				cta: { label: 'Start free trial', href: '#' },
				bullets: ['25M events/month', '1-year retention', 'Unlimited dashboards', 'Anomaly detection', 'Shared Slack channel'],
				featured: true,
				badge: 'MOST POPULAR',
			},
			{
				name: 'Scale',
				price: 'Talk to us',
				desc: 'SLA, SSO/SAML, custom data residency and dedicated support.',
				cta: { label: 'Book a call', href: '#' },
				bullets: ['Unlimited events', 'Custom retention', 'SSO/SAML · audit logs', '99.99% SLA', 'Dedicated engineer'],
			},
		],
	},

	faq: {
		eyebrow: '// QUESTIONS',
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
				a: 'Yes — full historical data as Parquet or CSV, anytime. No lock-in, no hostage data.',
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
