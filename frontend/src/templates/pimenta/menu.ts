/**
 * Pimenta helpers with no Astro imports (the reservation one also runs in the
 * browser): prices, the WhatsApp reservation message and the JSON-LD.
 */
import { localBusinessJsonLd } from '../core/hours';
import type { PimentaConfig } from './schema';

type Locale = 'pt-BR' | 'en';

/** 38 → "R$ 38" · 38.9 → "R$ 38,90". */
export function formatPrice(value: number, locale: Locale = 'pt-BR'): string {
	const whole = Number.isInteger(value);
	return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: whole ? 0 : 2,
		maximumFractionDigits: 2,
	}).format(value);
}

/** "2026-09-19" → "19/09" (pt) · "Sep 19" (en). Invalid input comes back as is. */
export function formatDate(iso: string, locale: Locale = 'pt-BR'): string {
	const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
	if (!m) return iso;
	const date = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12));
	return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'pt-BR', { day: '2-digit', month: locale === 'en' ? 'short' : '2-digit', timeZone: 'UTC' }).format(date);
}

/** "1 pessoa" · "4 pessoas" / "1 person" · "4 people". */
export function peopleLabel(n: number, locale: Locale = 'pt-BR'): string {
	if (locale === 'en') return `${n} ${n === 1 ? 'person' : 'people'}`;
	return `${n} ${n === 1 ? 'pessoa' : 'pessoas'}`;
}

export interface ReservationInput {
	message: string;
	nameSentence: string;
	people: number;
	date: string;
	time: string;
	name?: string;
	locale?: Locale;
}

/** The text that goes to WhatsApp. An empty date reads as "a combinar" / "to be arranged". */
export function composeReservation(r: ReservationInput): string {
	const locale = r.locale ?? 'pt-BR';
	const date = r.date ? formatDate(r.date, locale) : locale === 'en' ? 'a date to be arranged' : 'a combinar';
	const text = r.message.replace('{pessoas}', peopleLabel(r.people, locale)).replace('{data}', date).replace('{horario}', r.time);
	const name = r.name?.trim();
	return name ? `${text} ${r.nameSentence.replace('{nome}', name)}` : text;
}

/** schema.org Restaurant (or the configured subtype) with cuisine, menu anchor and reservations. */
export function restaurantJsonLd(site: PimentaConfig): Record<string, unknown> {
	const { brand, seo, contact, location } = site;
	return localBusinessJsonLd({
		type: site.businessType,
		name: brand.name,
		url: seo.canonical,
		description: brand.tagline,
		telephone: contact.phone,
		email: contact.email,
		address: location.address,
		mapsUrl: location.mapsUrl,
		hours: location.hours,
		extra: {
			...(site.cuisine.length ? { servesCuisine: site.cuisine } : {}),
			...(site.priceRange ? { priceRange: site.priceRange } : {}),
			hasMenu: `${seo.canonical.replace(/#.*$/, '')}#cardapio`,
			acceptsReservations: 'True',
		},
	});
}
