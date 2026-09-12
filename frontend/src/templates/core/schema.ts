/**
 * Core schema — the part of `site.config.ts` every template shares.
 *
 * A template extends it (`baseSiteSchema.extend({ ... })`) in its own
 * `schema.ts`; the client's `site.config.ts` calls `defineSite(schema, {...})`
 * so `astro build` fails with a readable checklist instead of a broken page.
 *
 * Uses the zod that ships with Astro — no extra dependency.
 */
import { z } from 'astro/zod';
import type { ImageMetadata } from 'astro';

export const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'expected a 6-digit hex colour like #ff5964');

/** An imported image (`import x from '../assets/x.jpg'`), never a string path. */
export const image = z.custom<ImageMetadata>(
	(v) => !!v && typeof v === 'object' && 'src' in v && 'width' in v,
	'expected an imported image (import x from "../assets/x.jpg")',
);

export const baseSiteSchema = z.object({
	brand: z.object({
		name: z.string().min(1),
		tagline: z.string().optional(),
		logo: image.nullable().default(null),
		locale: z.enum(['pt-BR', 'en']).default('pt-BR'),
	}),
	theme: z.object({
		accent: hex,
		accent2: hex.optional(),
		bg: hex,
		bg2: hex.optional(),
		ink: hex,
		radius: z.number().default(10),
	}),
	seo: z.object({
		title: z.string().min(1).max(70),
		description: z.string().min(1).max(170),
		canonical: z.url(),
		ogImage: image.nullable().default(null),
		jsonLd: z.record(z.string(), z.unknown()).optional(),
	}),
	contact: z.object({
		whatsapp: z
			.object({
				number: z.string().regex(/^\d{10,15}$/, 'digits only, with country code (5511999998888)'),
				message: z.string(),
			})
			.optional(),
		phone: z.string().optional(),
		email: z.email().optional(),
		form: z
			.object({
				provider: z.enum(['none', 'whatsapp', 'formspree', 'web3forms', 'resend', 'webhook']).default('none'),
				endpoint: z.string().optional(),
				successUrl: z.string().optional(),
				successMessage: z.string().default('Recebemos! Retornamos em até 1 dia útil.'),
			})
			.prefault({}),
	}),
	analytics: z
		.object({
			ga4: z.string().optional(),
			metaPixel: z.string().optional(),
			plausibleDomain: z.string().optional(),
		})
		.prefault({}),
	legal: z
		.object({
			privacyUrl: z.string().optional(),
			company: z.string().optional(),
			cnpj: z.string().optional(),
			lines: z.array(z.string()).default([]),
		})
		.prefault({}),
	nav: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
});

export type BaseSite = z.infer<typeof baseSiteSchema>;
/** What the client writes (defaults still optional). */
export type BaseSiteInput = z.input<typeof baseSiteSchema>;

/** One field of a `LeadForm`. Templates describe their forms with this. */
export interface LeadField {
	name: string;
	label: string;
	type: 'text' | 'tel' | 'email' | 'select' | 'textarea';
	required?: boolean;
	placeholder?: string;
	options?: string[];
	autocomplete?: string;
}

/** Deep-walks the config and lists every string still starting with `TODO_`. */
function findTodos(value: unknown, path: string, out: string[], seen: Set<object>): void {
	if (typeof value === 'string') {
		if (value.startsWith('TODO_')) out.push(`${path || '(root)'}: replace TODO_ placeholder`);
		return;
	}
	if (!value || typeof value !== 'object' || seen.has(value)) return;
	seen.add(value);
	if (Array.isArray(value)) {
		value.forEach((v, i) => findTodos(v, `${path}[${i}]`, out, seen));
		return;
	}
	for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
		findTodos(v, path ? `${path}.${k}` : k, out, seen);
	}
}

/**
 * Validates a site config. Throws ONE error listing every problem as
 * `path.to.field: message` (one per line) so the build output reads as a
 * checklist. Also rejects any `TODO_…` string left by the scaffold.
 */
export function defineSite<T extends z.ZodType>(schema: T, config: unknown): z.infer<T> {
	const problems: string[] = [];
	findTodos(config, '', problems, new Set());

	const result = schema.safeParse(config);
	if (!result.success) {
		for (const issue of result.error.issues) {
			problems.push(`${issue.path.join('.') || '(root)'}: ${issue.message}`);
		}
	}

	if (!result.success || problems.length > 0) {
		const list = [...new Set(problems)].map((p) => `  - ${p}`).join('\n');
		throw new Error(`site.config.ts: ${problems.length} problem(s) found\n${list}\n`);
	}
	return result.data as z.infer<T>;
}
