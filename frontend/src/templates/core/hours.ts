/**
 * Opening hours shared by templates that show them (Sálvia, Pimenta): labels
 * for the page, the "aberto agora" status (runs in the browser too, so no Astro
 * or zod imports here) and the schema.org LocalBusiness JSON-LD.
 */

export const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export type Day = (typeof DAYS)[number];
export interface Slot {
	days: readonly Day[];
	opens: string;
	closes: string;
}
type Locale = 'pt-BR' | 'en';

const SHORT: Record<Locale, Record<Day, string>> = {
	'pt-BR': { mon: 'Seg', tue: 'Ter', wed: 'Qua', thu: 'Qui', fri: 'Sex', sat: 'Sáb', sun: 'Dom' },
	en: { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' },
};
const LONG: Record<Locale, Record<Day, string>> = {
	'pt-BR': { mon: 'Segunda', tue: 'Terça', wed: 'Quarta', thu: 'Quinta', fri: 'Sexta', sat: 'Sábado', sun: 'Domingo' },
	en: { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' },
};
const WORDS: Record<Locale, { to: string; and: string; closed: string; range: string }> = {
	'pt-BR': { to: 'a', and: 'e', closed: 'Fechado', range: 'às' },
	en: { to: 'to', and: 'and', closed: 'Closed', range: 'to' },
};

/** Minutes after midnight. "00:00" as a closing time means midnight at the end of the day. */
const minutes = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
const closeMin = (hhmm: string) => minutes(hhmm) || 24 * 60;

/** "08:00" → "8h" · "08:30" → "8h30" (pt) · "8:30" (en). */
export function formatTime(hhmm: string, locale: Locale): string {
	const h = Number(hhmm.slice(0, 2));
	const m = hhmm.slice(3, 5);
	if (locale === 'en') return m === '00' ? `${h}:00` : `${h}:${m}`;
	return m === '00' ? `${h}h` : `${h}h${m}`;
}

/** ['mon'…'fri'] → "Seg a Sex"; non-consecutive → "Seg, Qua e Sex". */
export function formatDays(days: readonly Day[], locale: Locale): string {
	const idx = [...new Set(days)].map((d) => DAYS.indexOf(d)).sort((a, b) => a - b);
	const names = idx.map((i) => SHORT[locale][DAYS[i] as Day]);
	const consecutive = idx.every((v, i) => i === 0 || v === (idx[i - 1] ?? -2) + 1);
	if (idx.length > 2 && consecutive) return `${names[0]} ${WORDS[locale].to} ${names[names.length - 1]}`;
	if (names.length <= 1) return names.join('');
	return `${names.slice(0, -1).join(', ')} ${WORDS[locale].and} ${names[names.length - 1]}`;
}

const span = (s: Slot, locale: Locale) => `${formatTime(s.opens, locale)} ${WORDS[locale].range} ${formatTime(s.closes, locale)}`;

/** One line for a hero or footer: "Seg a Sex, 8h às 19h · Sáb, 8h às 12h". */
export function hoursSummary(hours: readonly Slot[], locale: Locale): string {
	return hours.map((s) => `${formatDays(s.days, locale)}, ${span(s, locale)}`).join(' · ');
}

/** Seven rows for the hours table, closed days included. */
export function hoursTable(hours: readonly Slot[], locale: Locale): { day: Day; label: string; value: string; closed: boolean }[] {
	return DAYS.map((day) => {
		const slots = hours.filter((s) => s.days.includes(day)).sort((a, b) => minutes(a.opens) - minutes(b.opens));
		return {
			day,
			label: LONG[locale][day],
			value: slots.length ? slots.map((s) => span(s, locale)).join(', ') : WORDS[locale].closed,
			closed: slots.length === 0,
		};
	});
}

/** Current weekday + minutes in the business's time zone (not the visitor's). */
function nowIn(timezone: string, at: Date): { day: Day; min: number } {
	const parts = new Intl.DateTimeFormat('en-US', { timeZone: timezone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(at);
	const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
	const day = get('weekday').slice(0, 3).toLowerCase() as Day;
	return { day, min: Number(get('hour')) * 60 + Number(get('minute')) };
}

export interface OpenStrings {
	open: string; // "Aberto agora · fecha às {time}"
	opensLater: string; // "Fechado agora · abre às {time}"
	opensTomorrow: string; // "Fechado · abre amanhã às {time}"
	opensOn: string; // "Fechado · abre {day} às {time}"
}

/** Status line for `at` (defaults to now), or null when the hours never open. */
export function openStatus(hours: readonly Slot[], timezone: string, locale: Locale, s: OpenStrings, at = new Date()): { open: boolean; text: string } | null {
	const { day, min } = nowIn(timezone, at);
	const today = DAYS.indexOf(day);
	const slotsOn = (d: Day) => hours.filter((h) => h.days.includes(d)).sort((a, b) => minutes(a.opens) - minutes(b.opens));

	const current = slotsOn(day).find((h) => min >= minutes(h.opens) && min < closeMin(h.closes));
	if (current) return { open: true, text: s.open.replace('{time}', formatTime(current.closes, locale)) };

	const later = slotsOn(day).find((h) => minutes(h.opens) > min);
	if (later) return { open: false, text: s.opensLater.replace('{time}', formatTime(later.opens, locale)) };

	for (let i = 1; i <= 7; i++) {
		const d = DAYS[(today + i) % 7] as Day;
		const first = slotsOn(d)[0];
		if (!first) continue;
		const time = formatTime(first.opens, locale);
		if (i === 1) return { open: false, text: s.opensTomorrow.replace('{time}', time) };
		return { open: false, text: s.opensOn.replace('{day}', LONG[locale][d].toLowerCase()).replace('{time}', time) };
	}
	return null;
}

export const OPEN_STRINGS: Record<Locale, OpenStrings> = {
	'pt-BR': {
		open: 'Aberto agora · fecha às {time}',
		opensLater: 'Fechado agora · abre às {time}',
		opensTomorrow: 'Fechado · abre amanhã às {time}',
		opensOn: 'Fechado · abre {day} às {time}',
	},
	en: {
		open: 'Open now · closes at {time}',
		opensLater: 'Closed now · opens at {time}',
		opensTomorrow: 'Closed · opens tomorrow at {time}',
		opensOn: 'Closed · opens {day} at {time}',
	},
};

const SCHEMA_DAY: Record<Day, string> = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };

export interface LocalBusinessInput {
	/** schema.org type: LocalBusiness, MedicalClinic, BeautySalon, Restaurant, CafeOrCoffeeShop… */
	type: string;
	name: string;
	url: string;
	description?: string;
	telephone?: string;
	email?: string;
	address: { street: string; district?: string; city: string; state: string; zip?: string };
	mapsUrl?: string;
	hours: readonly Slot[];
	/** Extra properties for the type (servesCuisine, menu, acceptsReservations…). */
	extra?: Record<string, unknown>;
}

/** schema.org LocalBusiness (or subtype): what Google uses for local results (address, hours, phone). */
export function localBusinessJsonLd(b: LocalBusinessInput): Record<string, unknown> {
	const a = b.address;
	return {
		'@context': 'https://schema.org',
		'@type': b.type,
		name: b.name,
		url: b.url,
		...(b.description ? { description: b.description } : {}),
		...(b.telephone ? { telephone: b.telephone } : {}),
		...(b.email ? { email: b.email } : {}),
		address: {
			'@type': 'PostalAddress',
			streetAddress: a.street,
			...(a.district ? { addressLocality: `${a.district}, ${a.city}` } : { addressLocality: a.city }),
			addressRegion: a.state,
			...(a.zip ? { postalCode: a.zip } : {}),
			addressCountry: 'BR',
		},
		...(b.mapsUrl ? { hasMap: b.mapsUrl } : {}),
		openingHoursSpecification: b.hours.map((h) => ({
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: h.days.map((d) => SCHEMA_DAY[d]),
			opens: h.opens,
			closes: h.closes,
		})),
		...b.extra,
	};
}
