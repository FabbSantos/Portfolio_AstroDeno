/**
 * Pimenta — poster-like landing for any place that serves food or drinks
 * (restaurant, bar, café, bakery, burger joint). Demos: restaurant and café.
 *
 * Lean on purpose: hero, menu, reservation and location are required; the
 * signature dishes row and the crew section render only when present. Section
 * titles have pt-BR defaults, so a client config is mostly data (menu, hours).
 *
 * Strings marked "md" accept the mini-markdown of `sections/_md.ts`:
 *   **text** → accent colour · ==text== → highlighter · newline → <br>
 */
import { z } from 'astro/zod';
import { baseSiteSchema, defineSite, image } from '../core/schema';
import { DAYS } from '../core/hours';
import { restaurantJsonLd } from './menu';

const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'expected 24h time like 19:30');

/** Section title + optional lead, with a default title so the client can omit both. */
const head = (title: string) => ({
	title: z.string().min(1).default(title),
	lead: z.string().optional(),
});

const link = z.object({ label: z.string().min(1), href: z.string().min(1) });

export const pimentaSchema = baseSiteSchema.extend({
	/** schema.org type: Restaurant, BarOrPub, CafeOrCoffeeShop, Bakery, FastFoodRestaurant… */
	businessType: z
		.string()
		.regex(/^[A-Z][A-Za-z]+$/, 'expected a schema.org type like Restaurant or CafeOrCoffeeShop')
		.default('Restaurant'),
	/** "Brasileira", "Italiana"… (schema.org servesCuisine). */
	cuisine: z.array(z.string().min(1)).default([]),
	/** "$$" style price range for Google. */
	priceRange: z.string().optional(),

	topbar: z
		.object({
			cta: z.string().min(1).default('Reservar'),
		})
		.prefault({}),

	hero: z.object({
		/** One short paragraph on the left. */
		tagline: z.string().min(1),
		/** Big condensed title. Each line stays on one line (use \n to break), so keep lines short. */
		title: z.string().min(1),
		/** Square photo of a plate or cup shot from above; it is cut to a circle. */
		photo: image,
		photoAlt: z.string().min(1),
		cta: z.string().min(1).default('Reservar mesa'),
		secondaryCta: z.string().min(1).default('Ver cardápio'),
		/** Instagram profile URL, shown under the hero. */
		instagram: z.url().optional(),
	}),

	menu: z.object({
		...head('Cardápio'),
		/** Small print under the categories: couvert, service fee, allergies. */
		note: z.string().optional(),
		categories: z
			.array(
				z.object({
					name: z.string().min(1),
					items: z
						.array(
							z.object({
								name: z.string().min(1),
								desc: z.string().optional(),
								/** In BRL; 0 hides the price ("consulte"). */
								price: z.number().nonnegative(),
								/** Short marks after the description: "vegano", "sem glúten", "picante". */
								tags: z.array(z.string().min(1)).max(3).default([]),
							})
						)
						.min(1)
						.max(30),
				})
			)
			.min(1)
			.max(8),
		/** Link to a full menu (PDF, iFood). */
		full: link.optional(),
	}),

	signature: z
		.object({
			...head('Da casa'),
			items: z
				.array(
					z.object({
						name: z.string().min(1),
						desc: z.string().optional(),
						price: z.number().nonnegative().optional(),
						/** Portrait photo (900×1200). */
						photo: image,
						alt: z.string().min(1),
					})
				)
				.min(3)
				.max(6),
		})
		.optional(),

	crew: z
		.object({
			...head('Quem faz'),
			people: z
				.array(
					z.object({
						name: z.string().min(1),
						role: z.string().min(1),
						/** Portrait photo (800×1000). Hands or backs work as well as faces. */
						photo: image,
						alt: z.string().min(1),
					})
				)
				.min(2)
				.max(4),
		})
		.optional(),

	reservation: z
		.object({
			...head('Reserve sua mesa'),
			lead: z.string().default('Escolha o dia, o horário e quantas pessoas. A mensagem sai pronta no WhatsApp.'),
			dateLabel: z.string().default('Dia'),
			timeLabel: z.string().default('Horário'),
			times: z.array(hhmm).min(1).default(['12:00', '13:00', '19:00', '20:00', '21:00']),
			peopleLabel: z.string().default('Pessoas'),
			maxPeople: z.number().int().min(1).max(40).default(12),
			nameLabel: z.string().default('Seu nome (opcional)'),
			cta: z.string().min(1).default('Enviar pelo WhatsApp'),
			/** {pessoas}, {data} and {horario} are filled in; the name sentence is dropped when empty. */
			message: z.string().default('Olá! Gostaria de reservar uma mesa para {pessoas} no dia {data}, às {horario}.'),
			nameSentence: z.string().default('Meu nome é {nome}.'),
			foot: z.string().optional(),
			/** Delivery and ordering links shown beside the form. */
			delivery: z
				.object({
					title: z.string().default('Prefere em casa?'),
					links: z.array(link).min(1).max(4),
				})
				.optional(),
		})
		.prefault({}),

	location: z.object({
		...head('Onde estamos'),
		address: z.object({
			street: z.string().min(1),
			district: z.string().optional(),
			city: z.string().min(1),
			state: z.string().length(2),
			zip: z.string().optional(),
		}),
		mapsUrl: z.url().optional(),
		mapsLabel: z.string().default('Abrir no mapa'),
		directions: z.array(z.string().min(1)).default([]),
		hoursTitle: z.string().default('Horário'),
		/** closes '00:00' means midnight. */
		hours: z
			.array(
				z.object({
					days: z.array(z.enum(DAYS)).min(1),
					opens: hhmm,
					closes: hhmm,
				})
			)
			.min(1),
		timezone: z.string().default('America/Sao_Paulo'),
		hoursNote: z.string().optional(),
	}),

	footer: z.object({
		line: z.string().min(1),
		/** Giant name at the bottom. Defaults to brand.name; one short word reads best. */
		wordmark: z.string().optional(),
	}),
});

export type PimentaConfig = z.infer<typeof pimentaSchema>;
/** What the client writes in `site.config.ts` (defaults still optional). */
export type PimentaInput = z.input<typeof pimentaSchema>;

/** Validates the config and, unless `seo.jsonLd` is set, describes the place as schema.org `businessType`. */
export const definePimenta = (config: PimentaInput): PimentaConfig => {
	const site = defineSite(pimentaSchema, config);
	site.seo.jsonLd ??= restaurantJsonLd(site);
	return site;
};
