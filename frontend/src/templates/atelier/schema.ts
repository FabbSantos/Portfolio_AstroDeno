/**
 * Atelier — studio / agency portfolio.
 * Editorial, lots of whitespace, case grid + numbered process.
 *
 * Extends the core site schema with one slice per section. Strings marked
 * "md" accept the mini-markdown of `sections/_md.ts`:
 *   **text** → italic · ==text== → italic underlined in the second colour · newline → <br>
 */
import { z } from 'astro/zod';
import { baseSiteSchema, defineSite, hex, image } from '../core/schema';

const link = z.object({ label: z.string().min(1), href: z.string().min(1) });

/** Same shape as core `LeadField` (core only exports the TS type). */
const leadField = z.object({
	name: z.string().regex(/^[a-zA-Z][a-zA-Z0-9_-]{0,39}$/, 'letters, digits, _ or -'),
	label: z.string().min(1),
	type: z.enum(['text', 'tel', 'email', 'select', 'textarea']),
	required: z.boolean().optional(),
	placeholder: z.string().optional(),
	options: z.array(z.string()).optional(),
	autocomplete: z.string().optional(),
});

const caseItem = z.object({
	/** Index shown next to the title ("01"). */
	n: z.string().min(1),
	client: z.string().min(1),
	tag: z.string().min(1),
	year: z.string().min(1),
	/** Case-study / external URL. Without it the card is not a link. */
	href: z.string().min(1).optional(),
	/** 4:3 photo (1600×1200). `null` → tinted placeholder. */
	image: image.nullable().default(null),
	/** Alt text for the photo; defaults to `client`. */
	alt: z.string().optional(),
	/** Pastel colour of the placeholder gradient (used only when `image` is null). */
	tint: hex.optional(),
});

export const atelierSchema = baseSiteSchema.extend({
	topbar: z.object({
		/** Small glyph after the brand name (◆). Empty string hides it. */
		mark: z
			.string()
			.max(3)
			.regex(/^[^'"\\]*$/, 'no quotes or backslashes')
			.default('◆'),
		brandHref: z.string().min(1).default('/'),
		cta: link,
	}),
	hero: z.object({
		eyebrow: z.string().min(1),
		/** md */
		title: z.string().min(1),
		/** Wide photo (2400×1200) that opens the page above the title; the LCP. Omit for a text-only hero. */
		image: image.optional(),
		imageAlt: z.string().optional(),
		meta: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).default([]),
	}),
	work: z.object({
		eyebrow: z.string().min(1),
		/** md */
		title: z.string().min(1),
		cases: z.array(caseItem).min(1),
		archive: link.optional(),
	}),
	process: z.object({
		eyebrow: z.string().min(1),
		/** md */
		title: z.string().min(1),
		lead: z.string().optional(),
		steps: z.array(z.object({ n: z.string().min(1), t: z.string().min(1), d: z.string().min(1) })).min(1),
	}),
	studio: z.object({
		eyebrow: z.string().min(1),
		/** md */
		title: z.string().min(1),
		paragraphs: z.array(z.string().min(1)).min(1),
		link: link.optional(),
		stats: z.array(z.object({ v: z.string().min(1), l: z.string().min(1) })).default([]),
	}),
	/** Core `contact` (whatsapp / phone / form) + the closing section's copy. E-mail is required: the template is e-mail first. */
	contact: baseSiteSchema.shape.contact.extend({
		email: z.email(),
		eyebrow: z.string().min(1),
		/** md */
		title: z.string().min(1),
		sub: z.string().optional(),
		/** Text before the social links ("or follow along"). */
		socialsLead: z.string().optional(),
		socials: z.array(link).default([]),
		/** Optional lead form under the e-mail link (wired to `contact.form.provider`). */
		inquiry: z
			.object({
				fields: z.array(leadField).min(1),
				cta: z.string().min(1),
				foot: z.string().optional(),
			})
			.optional(),
	}),
	footer: z.object({
		/** "© 2026 · Studio · City" — `legal.lines` are printed under it. */
		line: z.string().min(1),
	}),
});

export type AtelierConfig = z.infer<typeof atelierSchema>;
/** What the client writes in `site.config.ts` (defaults still optional). */
export type AtelierInput = z.input<typeof atelierSchema>;

export const defineAtelier = (config: AtelierInput): AtelierConfig => defineSite(atelierSchema, config);
