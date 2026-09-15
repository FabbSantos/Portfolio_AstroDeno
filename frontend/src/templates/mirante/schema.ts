/**
 * Mirante — Brazilian real-estate launch landing (lançamento imobiliário).
 * Schema = core `baseSiteSchema` + one object per section, in page order:
 * topbar → hero → stats → project → plans → location → conditions → lead →
 * footer. Every user-facing string lives here; the sections render only
 * what this config says. Legal lines (CRECI, RI, disclaimer) come from the
 * core `legal.lines`; the CNPJ from `legal.cnpj`.
 *
 * "rich" strings accept `**bold**` (→ italic inside headings, bold ink in body
 * text, the giant figure in a condition headline) and `\n` (→ line break).
 * See sections/_md.ts.
 */
import { z } from 'astro/zod';
import { baseSiteSchema, defineSite, image } from '../core/schema';

const rich = z.string().min(1);
const link = z.object({ label: z.string().min(1), href: z.string().min(1) });

export const miranteSchema = baseSiteSchema.extend({
	/** Sticky topbar. `nav` (core) supplies the links; `brand.tagline` is the small neighbourhood label after the brand. */
	topbar: z
		.object({
			brandHref: z.string().min(1).default('#'),
			cta: link.prefault({ label: 'Falar com consultor →', href: '#lead' }),
		})
		.prefault({}),

	hero: z.object({
		/** Shown after the pulsing "live" dot, e.g. 'Lançamento · Pinheiros, SP · Pré-vendas abertas'. */
		eyebrow: z.string().min(1),
		title: z.string().min(1),
		/** Second half of the h1, set in italic. */
		titleAccent: z.string().min(1),
		/** rich */
		sub: rich,
		/**
		 * 2 to 6 landscape photos (2400×1500). #1 opens the page full-screen (the LCP);
		 * all of them make the hero filmstrip, and #2… take turns beside the project
		 * copy. #2 is also the backdrop of the lead block.
		 */
		gallery: z.array(z.object({ image, label: z.string().min(1), alt: z.string().min(1) })).min(2).max(6),
		/** Short lead form inside the hero (core LeadForm `mini`: nome + telefone). */
		miniForm: z.object({
			title: z.string().min(1),
			cta: z.string().min(1),
			foot: z.string().optional(),
			/** Link after `foot`; rendered only when `contact.whatsapp` is set. */
			whatsappLabel: z.string().min(1).default('ou WhatsApp direto ↗'),
			labels: z
				.object({
					nome: z.string().min(1).default('Nome'),
					telefone: z.string().min(1).default('Telefone'),
				})
				.prefault({}),
		}),
	}),

	/** Numbers band under the hero (six fit one row on desktop). */
	stats: z.array(z.object({ v: z.string().min(1), l: z.string().min(1) })).min(1),

	project: z.object({
		eyebrow: z.string().optional(),
		/** rich */
		title: rich,
		/** rich */
		paragraphs: z.array(rich).min(1),
		amenitiesTitle: z.string().optional(),
		amenities: z.array(z.string().min(1)).min(1),
	}),

	plans: z.object({
		eyebrow: z.string().optional(),
		/** rich */
		title: rich,
		items: z
			.array(
				z.object({
					tag: z.string().min(1),
					m2: z.string().min(1),
					desc: z.string().min(1),
					/** Floor plan (≥1200px wide, 6:5). `null` → CSS wireframe (three layouts, cycled). */
					image: image.nullable().default(null),
					/** Alt text for the plan; defaults to '<tag> · <m2>'. */
					alt: z.string().optional(),
					featured: z.boolean().default(false),
					badge: z.string().optional(),
				}),
			)
			.min(1),
		/** Link at the bottom of every card. */
		link: link.prefault({ label: 'Ver disponibilidade →', href: '#lead' }),
		/** Room labels of the wireframe fallback, in order: sala, varanda, dormitório, suíte, cozinha, banho. */
		rooms: z.array(z.string().min(1)).length(6).default(['Sala', 'Varanda', 'Dorm', 'Suíte', 'Cozi', 'Banho']),
	}),

	location: z.object({
		eyebrow: z.string().optional(),
		/** rich */
		title: rich,
		map: z.discriminatedUnion('kind', [
			/** Client's own map (1300×1000, 13:10) — draw the pins on it. */
			z.object({ kind: z.literal('image'), image, alt: z.string().optional() }),
			/** Google Maps → Share → Embed a map → the `src` of the iframe. */
			z.object({ kind: z.literal('gmaps'), embedUrl: z.url() }),
			/** CSS placeholder with the brand marker and numbered pins for the first 6 POIs. */
			z.object({ kind: z.literal('wireframe') }),
		]),
		/** Points of interest, numbered 01… in this order. `d` is the distance ('320m'). */
		poi: z.array(z.object({ name: z.string().min(1), d: z.string().min(1) })).min(1),
	}),

	conditions: z.object({
		eyebrow: z.string().optional(),
		/** rich */
		title: rich,
		items: z
			.array(
				z.object({
					tag: z.string().min(1),
					/** rich — e.g. 'Desconto de até **12%**' */
					headline: rich,
					desc: z.string().min(1),
					bullets: z.array(z.string().min(1)).default([]),
					featured: z.boolean().default(false),
					badge: z.string().optional(),
				}),
			)
			.min(1),
		/** Small print under the cards. */
		foot: z.string().optional(),
	}),

	lead: z.object({
		eyebrow: z.string().optional(),
		/** rich */
		title: rich,
		sub: z.string().min(1),
		bullets: z.array(z.string().min(1)).default([]),
		/** Options of the "melhor horário" select. */
		times: z.array(z.string().min(1)).min(1),
		cta: z.string().min(1),
		/** Under the button. `privacyLabel` inside it becomes a link when `legal.privacyUrl` is set. */
		foot: z.string().optional(),
		privacyLabel: z.string().min(1).default('Política de Privacidade'),
		messagePlaceholder: z.string().optional(),
		/** Field labels (the "tipologia" options come from `plans.items[].tag · m2`, preceded by `qualquer`). */
		labels: z
			.object({
				nome: z.string().min(1).default('Nome completo'),
				email: z.string().min(1).default('E-mail'),
				telefone: z.string().min(1).default('Telefone'),
				tipologia: z.string().min(1).default('Tipologia de interesse'),
				horario: z.string().min(1).default('Melhor horário'),
				mensagem: z.string().min(1).default('Mensagem (opcional)'),
				qualquer: z.string().min(1).default('Não tenho preferência'),
			})
			.prefault({}),
	}),

	footer: z.object({
		/** Under the brand: 'R. Cardeal Arcoverde, 1450 · Pinheiros · São Paulo, SP'. */
		address: z.string().min(1),
		/** Optional second line under the address (opening hours of the sales stand). */
		hours: z.string().optional(),
		/** Info columns; `p` accepts `\n`. */
		columns: z.array(z.object({ h: z.string().min(1), p: rich })).default([]),
		/** Defaults to '© <year>'. `legal.lines` (+ CNPJ) are printed on the other side. */
		copyright: z.string().optional(),
	}),
});

export type MiranteConfig = z.infer<typeof miranteSchema>;
/** What the client writes in site.config.ts (defaults still optional). */
export type MiranteInput = z.input<typeof miranteSchema>;

export const defineMirante = (config: MiranteInput): MiranteConfig => defineSite(miranteSchema, config);
