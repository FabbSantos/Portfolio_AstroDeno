/**
 * Sálvia — clinic landing (medical, dental, aesthetics, physio), editorial.
 *
 * Lean on purpose: hero, services, booking and location are required; team,
 * insurance, space and faq render only when present. Section titles have
 * pt-BR defaults, so a client config can be mostly data (services, hours, address).
 *
 * Strings marked "md" accept the mini-markdown of `sections/_md.ts`:
 *   **text** → accent colour · ==text== → highlighter · newline → <br>
 */
import { z } from 'astro/zod';
import { baseSiteSchema, defineSite, image } from '../core/schema';
import { clinicJsonLd, DAYS } from './hours';

const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'expected 24h time like 08:00');

/** Section title (md) + optional lead, with a default title so the client can omit both. */
const head = (title: string) => ({
	/** md */
	title: z.string().min(1).default(title),
	lead: z.string().optional(),
});

export const salviaSchema = baseSiteSchema.extend({
	topbar: z
		.object({
			cta: z.string().min(1).default('Agendar'),
		})
		.prefault({}),

	hero: z.object({
		/** Short line on the left: kind of clinic + neighbourhood. */
		tagline: z.string().min(1),
		/** md */
		title: z.string().min(1),
		sub: z.string().min(1),
		/** Wide photo under the copy (2000×900). `null` → no media band. */
		photo: image.nullable().default(null),
		photoAlt: z.string().default(''),
		/** Up to 4 short facts, printed as one line ("Particular e convênios · Estacionamento"). */
		highlights: z.array(z.string().min(1)).max(4).default([]),
		cta: z.string().min(1).default('Agendar pelo WhatsApp'),
		secondaryCta: z.string().min(1).default('Ver especialidades'),
	}),

	services: z.object({
		...head('Especialidades'),
		items: z
			.array(
				z.object({
					name: z.string().min(1),
					desc: z.string().min(1),
					/** Portrait photo (800×1000) that follows the cursor on hover. `null` → tinted card with the name. */
					photo: image.nullable().default(null),
				})
			)
			.min(1)
			.max(12),
		/** Row action and the label of the circle that follows the cursor. */
		bookLabel: z.string().min(1).default('Agendar'),
	}),

	booking: z
		.object({
			...head('Agende em dois toques.'),
			lead: z.string().default('Escolha a especialidade e o melhor período. A mensagem sai pronta no WhatsApp da clínica.'),
			serviceLabel: z.string().default('Especialidade'),
			periodLabel: z.string().default('Período'),
			periods: z.array(z.string().min(1)).min(1).default(['Manhã', 'Tarde']),
			nameLabel: z.string().default('Seu nome (opcional)'),
			previewLabel: z.string().default('Mensagem para'),
			cta: z.string().min(1).default('Abrir no WhatsApp'),
			/** {servico}, {periodo} and {nome} are filled in; the name sentence is dropped when empty. */
			message: z.string().default('Olá! Gostaria de agendar {servico} no período da {periodo}.'),
			nameSentence: z.string().default('Meu nome é {nome}.'),
			foot: z.string().optional(),
		})
		.prefault({}),

	team: z
		.object({
			...head('Quem atende'),
			people: z
				.array(
					z.object({
						name: z.string().min(1),
						role: z.string().min(1),
						/** Council registry ("CRM-RJ 52.123.456"). */
						registry: z.string().optional(),
						/** Square photo. `null` → no photo column for that row. */
						photo: image.nullable().default(null),
						bio: z.string().optional(),
					})
				)
				.min(1)
				.max(8),
		})
		.optional(),

	insurance: z
		.object({
			...head('Convênios'),
			plans: z.array(z.string().min(1)).min(1),
			note: z.string().optional(),
		})
		.optional(),

	space: z
		.object({
			...head('O espaço'),
			photos: z.array(z.object({ image, alt: z.string().min(1), caption: z.string().optional() })).min(1).max(3),
		})
		.optional(),

	faq: z
		.object({
			...head('Perguntas frequentes'),
			items: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).min(1),
		})
		.optional(),

	location: z.object({
		...head('Como chegar'),
		address: z.object({
			street: z.string().min(1),
			district: z.string().optional(),
			city: z.string().min(1),
			state: z.string().length(2),
			zip: z.string().optional(),
		}),
		/** "Abrir no mapa" link (Google Maps share link). */
		mapsUrl: z.url().optional(),
		mapsLabel: z.string().default('Abrir no mapa'),
		/** Short tips: transit, parking, accessibility. */
		directions: z.array(z.string().min(1)).default([]),
		hoursTitle: z.string().default('Horário de atendimento'),
		hours: z
			.array(
				z.object({
					days: z.array(z.enum(DAYS)).min(1),
					opens: hhmm,
					closes: hhmm,
				})
			)
			.min(1),
		/** IANA zone the hours are written in; drives "aberto agora". */
		timezone: z.string().default('America/Sao_Paulo'),
		hoursNote: z.string().optional(),
	}),

	footer: z.object({
		line: z.string().min(1),
		/** Giant name at the very bottom. Defaults to brand.name; a short word reads best. */
		wordmark: z.string().optional(),
		/** Responsável técnico with registry. Councils (CFM, CRO) require it in clinic advertising. */
		technicalLead: z.string().optional(),
	}),
});

export type SalviaConfig = z.infer<typeof salviaSchema>;
/** What the client writes in `site.config.ts` (defaults still optional). */
export type SalviaInput = z.input<typeof salviaSchema>;

/** Validates the config and, unless `seo.jsonLd` is set, describes the clinic as a schema.org MedicalClinic. */
export const defineSalvia = (config: SalviaInput): SalviaConfig => {
	const site = defineSite(salviaSchema, config);
	site.seo.jsonLd ??= clinicJsonLd(site);
	return site;
};
