/**
 * Sálvia's view of the shared hours helpers (core/hours.ts) plus its JSON-LD,
 * built from the site config.
 */
import { localBusinessJsonLd } from '../core/hours';
import type { SalviaConfig } from './schema';

export { DAYS, formatDays, formatTime, hoursSummary, hoursTable, openStatus, OPEN_STRINGS, type Day, type OpenStrings, type Slot } from '../core/hours';

/** schema.org LocalBusiness (or the configured subtype) for Google's local results. */
export function businessJsonLd(site: SalviaConfig): Record<string, unknown> {
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
	});
}
