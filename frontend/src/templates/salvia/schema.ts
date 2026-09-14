/**
 * Sálvia — clinic landing (medical, dental, aesthetics, physio).
 *
 * Lean on purpose: hero, services, booking and location are required; team,
 * insurance, space and faq render only when present. Section heads have pt-BR
 * defaults, so a client config can be mostly data (services, hours, address).
 *
 * Strings marked "md" accept the mini-markdown of `sections/_md.ts`:
 *   **text** → accent colour · ==text== → highlighter · newline → <br>
 */
import { z } from 'astro/zod';
import { baseSiteSchema, defineSite, image } from '../core/schema';
import { clinicJsonLd, DAYS } from './hours';

const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'expected 24h time like 08:00');

/** Line icons available for services (see sections/icons.ts). */
export const ICONS = ['stethoscope', 'pulse', 'tooth', 'heart', 'drop', 'sparkle', 'bone', 'leaf', 'apple', 'person', 'eye', 'brain'] as const;

/** eyebrow + title (md) + optional lead, with defaults so the client can omit them. */
const head = (eyebrow: string, title: string) => ({
	eyebrow: z.string().min(1).default(eyebrow),
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
		/** Short line above the title: kind of clinic + neighbourhood. */
		eyebrow: z.string().min(1),
		/** md */
		title: z.string().min(1),
		sub: z.string().min(1),
		/** Portrait photo (1200×1500) shown in an arch. `null` → soft tinted arch. */
		photo: image.nullable().default(null),
		photoAlt: z.string().default(''),
		/** Up to 4 short facts under the buttons ("Convênios e particular"). */
		highlights: z.array(z.string().min(1)).max(4).default([]),
		cta: z.string().min(1).default('Agendar pelo WhatsApp'),
		secondaryCta: z.string().min(1).default('Ver especialidades'),
	}),

	services: z.object({
		...head('Especialidades', 'Cuidado completo, **no mesmo endereço**.'),
		items: z
			.array(
				z.object({
					name: z.string().min(1),
					desc: z.string().min(1),
					icon: z.enum(ICONS).default('stethoscope'),
				})
			)
			.min(1)
			.max(12),
		/** Link on each card that preselects the service in the booking widget. */
		bookLabel: z.string().min(1).default('Agendar'),
	}),

	booking: z
		.object({
			...head('Agendamento', 'Agende em **dois toques**.'),
			lead: z.string().default('Escolha a especialidade e o melhor período. A mensagem sai pronta no WhatsApp da clínica.'),
			serviceLabel: z.string().default('Especialidade'),
			periodLabel: z.string().default('Período'),
			periods: z.array(z.string().min(1)).min(1).default(['Manhã', 'Tarde']),
			nameLabel: z.string().default('Seu nome (opcional)'),
			previewLabel: z.string().default('Sua mensagem'),
			cta: z.string().min(1).default('Abrir no WhatsApp'),
			/** {servico}, {periodo} and {nome} are filled in; the name sentence is dropped when empty. */
			message: z.string().default('Olá! Gostaria de agendar {servico} no período da {periodo}.'),
			nameSentence: z.string().default('Meu nome é {nome}.'),
			foot: z.string().optional(),
		})
		.prefault({}),

	team: z
		.object({
			...head('Equipe', 'Quem vai **cuidar de você**.'),
			people: z
				.array(
					z.object({
						name: z.string().min(1),
						role: z.string().min(1),
						/** Council registry shown as a chip ("CRM-RJ 52.123.456"). */
						registry: z.string().optional(),
						/** Square photo. `null` → initials. */
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
			...head('Convênios', 'Atendemos **particular e convênios**.'),
			plans: z.array(z.string().min(1)).min(1),
			note: z.string().optional(),
		})
		.optional(),

	space: z
		.object({
			...head('O espaço', 'Um lugar pensado pra **você ficar à vontade**.'),
			photos: z.array(z.object({ image, alt: z.string().min(1) })).min(1).max(3),
		})
		.optional(),

	faq: z
		.object({
			...head('Dúvidas frequentes', 'Antes de **marcar**.'),
			items: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).min(1),
		})
		.optional(),

	location: z.object({
		...head('Onde estamos', 'Fácil de **chegar**.'),
		address: z.object({
			street: z.string().min(1),
			district: z.string().optional(),
			city: z.string().min(1),
			state: z.string().length(2),
			zip: z.string().optional(),
		}),
		/** "Abrir no mapa" button (Google Maps share link). */
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
