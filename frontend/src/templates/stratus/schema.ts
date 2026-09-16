/**
 * Stratus — SaaS / B2B trial landing. Schema = core `baseSiteSchema` + one
 * object per section. Every user-facing string lives here; the sections
 * render only what this config says.
 *
 * "rich" strings accept `**bold**` (→ wider and heavier inside headings,
 * <strong> in body text) and `\n` (→ line break). See sections/_md.ts.
 */
import { z } from 'astro/zod';
import { baseSiteSchema, defineSite, hex, image } from '../core/schema';

const rich = z.string().min(1);
const link = z.object({ label: z.string().min(1), href: z.string().min(1) });

/** Mirrors core `LeadField` so a config can describe the final-CTA form. */
const leadField = z.object({
	name: z.string().regex(/^[a-zA-Z][a-zA-Z0-9_-]{0,39}$/, 'letters, digits, _ or - (starts with a letter)'),
	label: z.string().min(1),
	type: z.enum(['text', 'tel', 'email', 'select', 'textarea']),
	required: z.boolean().optional(),
	placeholder: z.string().optional(),
	options: z.array(z.string()).optional(),
	autocomplete: z.string().optional(),
});

export const stratusSchema = baseSiteSchema.extend({
	/** Desktop topbar; `nav` (core) supplies the links. */
	header: z.object({
		brandHref: z.string().default('/'),
		/** Renders an accent-coloured "." after the brand name (Stratus.). */
		brandDot: z.boolean().default(true),
		signIn: link.optional(),
		cta: link,
	}),

	hero: z.object({
		pill: z
			.object({
				tag: z.string().optional(),
				text: z.string().min(1),
				href: z.string().optional(),
			})
			.optional(),
		title: rich,
		lead: rich,
		primary: link,
		secondary: link.optional(),
		/** e.g. '★★★★★ **4.9** on G2 · trusted by 600+ teams'. Leading ★ run is styled; omit or '' to hide. */
		socialProof: z.string().optional(),
	}),

	/** Product shot in a hairline frame; without `image` a CSS dashboard mock is drawn from `kpis`. Omit to hide. */
	product: z
		.object({
			image: image.nullable().default(null),
			alt: z.string().optional(),
			/** Mono line on the frame's bar, e.g. 'app.stratus.io · v3.0'. Defaults to the brand name. */
			meta: z.string().optional(),
			kpis: z
				.array(z.object({ value: z.string().min(1), label: z.string().optional() }))
				.max(4)
				.default([]),
		})
		.superRefine((p, ctx) => {
			if (p.image && !p.alt) {
				ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['alt'], message: 'describe the screenshot (required when image is set)' });
			}
		})
		.optional(),

	/** Logo band; hidden when `items` is empty. Items without `image` render the name as a wordmark. */
	logos: z
		.object({
			title: z.string().optional(),
			items: z.array(z.object({ name: z.string().min(1), image: image.nullable().default(null) })).default([]),
		})
		.prefault({}),

	features: z.object({
		eyebrow: z.string().optional(),
		title: rich,
		lead: rich.optional(),
		items: z
			.array(
				z.object({
					/** Optional glyph (1–2 characters) shown next to the index. */
					icon: z.string().min(1).max(4).optional(),
					title: z.string().min(1),
					desc: rich,
					/** Optional per-card icon tint (hex); defaults to the accent. */
					tint: hex.optional(),
				}),
			)
			.min(1),
	}),

	/** Omit to drop the pricing section entirely. */
	pricing: z
		.object({
			eyebrow: z.string().optional(),
			title: rich,
			lead: rich.optional(),
			/** Monthly/annual switch; needs `priceAnnual` on the plans. */
			toggle: z
				.object({
					label: z.string().min(1).default('Billing'),
					monthly: z.string().min(1),
					annual: z.string().min(1),
					/** Small tag on the annual option, e.g. '-20%'. */
					note: z.string().optional(),
				})
				.optional(),
			/**
			 * Comparison rows, one value per plan (a string, or true/false for a check).
			 * Without it, every plan bullet becomes a row ticked for the plans that list it.
			 */
			compare: z
				.object({
					rows: z.array(z.object({ label: z.string().min(1), values: z.array(z.union([z.string(), z.boolean()])).min(1) })).min(1),
				})
				.optional(),
			/** Small print under the table. */
			foot: z.string().optional(),
			plans: z
				.array(
					z.object({
						name: z.string().min(1),
						price: z.string().min(1),
						/** Shown when the annual option of `toggle` is selected. */
						priceAnnual: z.string().optional(),
						/** e.g. 'per month' — shown small under the price. */
						period: z.string().optional(),
						desc: z.string().min(1),
						cta: link,
						bullets: z.array(z.string()).default([]),
						featured: z.boolean().default(false),
						badge: z.string().optional(),
					}),
				)
				.min(1),
		})
		.optional(),

	/** Omit to drop the FAQ. */
	faq: z
		.object({
			eyebrow: z.string().optional(),
			title: rich,
			items: z.array(z.object({ q: z.string().min(1), a: rich })).min(1),
		})
		.optional(),

	finalCta: z.object({
		title: rich,
		sub: rich.optional(),
		ctas: z.array(link).default([]),
		/** Optional lead-capture form (core LeadForm, `contact.form.provider`). Rendered below the buttons. */
		form: z
			.object({
				fields: z
					.array(leadField)
					.min(1)
					.default([{ name: 'email', label: 'Work email', type: 'email', required: true, placeholder: 'you@company.com' }]),
				cta: z.string().min(1),
				foot: z.string().optional(),
			})
			.optional(),
	}),

	footer: z
		.object({
			columns: z.array(z.object({ h: z.string().min(1), links: z.array(link).min(1) })).default([]),
			legalLinks: z.array(link).default([]),
			/** Defaults to '© <year> <legal.company ?? brand.name>'. */
			copyright: z.string().optional(),
		})
		.prefault({}),
});

export type StratusConfig = z.infer<typeof stratusSchema>;
/** What the client writes in site.config.ts (defaults still optional). */
export type StratusInput = z.input<typeof stratusSchema>;

export const defineStratus = (config: StratusInput): StratusConfig => defineSite(stratusSchema, config);
