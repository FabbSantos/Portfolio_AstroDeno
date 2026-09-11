/**
 * Brava — limited-drop e-commerce landing.
 * Extends the core site schema with one slice per section, in page order:
 * ticker → topbar → hero (+ drop countdown) → shop → lookbook → story →
 * newsletter → footer. Strings marked (md) accept `**underline**` and
 * `==accent==` (see sections/_md.ts).
 */
import { z } from 'astro/zod';
import { baseSiteSchema, defineSite, hex, image } from '../core/schema';

const link = z.object({ label: z.string().min(1), href: z.string().min(1) });

const tile = z.object({
	image,
	alt: z.string().min(1),
	caption: z.string().optional(),
});

export const bravaSchema = baseSiteSchema.extend({
	/** Announcement strip on top. Messages are joined with ' ★ ' and loop. */
	ticker: z.object({
		messages: z.array(z.string().min(1)).min(1),
	}),

	/** Desktop topbar: `nav` (core) on the left, brand centred, these on the right. */
	topbar: z
		.object({
			brandHref: z.string().default('/'),
			links: z.array(link).default([]),
			cart: z
				.object({
					show: z.boolean().default(false),
					label: z.string().default('Carrinho'),
					href: z.string().default('/cart'),
					count: z.number().int().nonnegative().optional(),
				})
				.default({}),
		})
		.default({}),

	/** The drop itself — the countdown reads `endsAt`. */
	drop: z.object({
		/** ISO 8601 with offset, e.g. '2026-09-30T23:59:59-03:00'. */
		endsAt: z.string().datetime({ offset: true }),
		countdownLabel: z.string().default('Tempo até o fim do drop'),
		units: z
			.object({
				days: z.string().default('dias'),
				hours: z.string().default('h'),
				minutes: z.string().default('min'),
				seconds: z.string().default('seg'),
			})
			.default({}),
		/** Shown in place of the numbers once `endsAt` has passed. */
		ended: z.string().default('Este drop acabou. Inscreva-se para saber do próximo.'),
	}),

	hero: z.object({
		eyebrow: z.string().min(1),
		/** One entry per line of the h1 (md). */
		lines: z.array(z.string().min(1)).min(1).max(4),
		sub: z.string().min(1),
		cta: link,
		/** Exactly 3 portrait images: the first spans both rows. */
		tiles: z.array(z.object({ image, alt: z.string().min(1), tint: hex.optional() })).length(3),
	}),

	shop: z.object({
		eyebrow: z.string().min(1),
		/** (md) */
		title: z.string().min(1),
		soldLabel: z.string().default('ESGOTADO'),
		products: z
			.array(
				z.object({
					/** Short index shown next to the name, e.g. '001'. */
					n: z.string().min(1),
					name: z.string().min(1),
					/** Already formatted: 'R$ 189'. */
					price: z.string().min(1),
					tag: z.string().optional(),
					sold: z.boolean().default(false),
					/** Product / checkout URL. Without it the card is not a link. */
					href: z.string().min(1).optional(),
					image: image.nullable().default(null),
					alt: z.string().optional(),
					/** Fallback gradient colour when there is no image. */
					tint: hex.optional(),
				}),
			)
			.min(1),
	}),

	lookbook: z.object({
		/** Visually hidden heading for the section. */
		title: z.string().min(1),
		eyebrow: z.string().min(1),
		caption: z.string().min(1),
		/** Exactly 4: #1 spans both rows on the left, #4 spans the full width below. */
		tiles: z.array(tile).length(4),
	}),

	story: z.object({
		eyebrow: z.string().min(1),
		/** (md) */
		title: z.string().min(1),
		paragraphs: z.array(z.string().min(1)).min(1),
		link: link.optional(),
	}),

	newsletter: z.object({
		/** (md) */
		title: z.string().min(1),
		sub: z.string().min(1),
		email: z.object({
			label: z.string().default('E-mail'),
			placeholder: z.string().optional(),
		}),
		/** Adds a name field — required by the `resend` / `webhook` providers. */
		name: z
			.object({
				label: z.string().default('Nome'),
				placeholder: z.string().optional(),
			})
			.optional(),
		cta: z.string().min(1),
		foot: z.string().optional(),
	}),

	footer: z
		.object({
			columns: z.array(z.object({ h: z.string().min(1), links: z.array(link).min(1) })).default([]),
			socials: z.array(link).default([]),
			privacyLabel: z.string().default('Privacidade'),
		})
		.default({}),
});

export type BravaConfig = z.infer<typeof bravaSchema>;
/** What the client writes (defaults still optional). */
export type BravaConfigInput = z.input<typeof bravaSchema>;

export const defineBrava = (c: unknown): BravaConfig => defineSite(bravaSchema, c);
