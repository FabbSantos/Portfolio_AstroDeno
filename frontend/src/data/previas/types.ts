/**
 * Shape of a client preview (/previas/<slug>).
 *
 * One file per preview in this folder; `index.ts` picks them all up, so a new
 * preview is a new data file and nothing else. Photos are not listed here:
 * they are read from public/previas/<slug>/ (see src/previas/photos.ts).
 *
 * Copy rule: every string is shown as written, upright, with no markup. Put
 * only the text the client (or the brief) gave. Section labels are one word.
 */
import type { Slot } from '../../templates/core/hours';

export interface PreviaTheme {
	accent: string;
	accent2?: string;
	bg: string;
	bg2?: string;
	ink: string;
	radius: number;
}

export interface PreviaData {
	/** URL segment: /previas/<slug>. */
	slug: string;
	/** Colours applied to the page. Keep the alternatives beside it in the data file. */
	theme: PreviaTheme;
	/** Business name: hero title, topbar, footer. */
	name: string;
	/** The one line under the name. */
	line: string;
	/** <title> and meta description (the page is noindex; this is for the tab and link previews). */
	seo: { title: string; description: string };
	whatsapp: {
		/** Digits only, with country code: 5521999999999. */
		number: string;
		/** Pre-filled message. */
		message: string;
		/** Button label. */
		label: string;
		/** Short label for the topbar. */
		short: string;
	};
	/** "5,0" and "91 avaliações" on Google. */
	rating: { value: string; count: string; source: string };
	/** One-word section labels. */
	labels: { work: string; services: string; reviews: string; hours: string };
	services: string[];
	/** Review texts, exactly as written by the clients. */
	reviews: string[];
	location: {
		address: { street: string; district: string; city: string; state: string };
		/** IANA zone of the business; "open now" is computed in it, not in the visitor's. */
		timezone: string;
		hours: Slot[];
		mapsLabel: string;
	};
}

/** wa.me link with the pre-filled message. */
export const whatsappHref = (w: PreviaData['whatsapp']): string => `https://wa.me/${w.number}?text=${encodeURIComponent(w.message)}`;

/** Google Maps search link built from the address. */
export const mapsHref = (a: PreviaData['location']['address']): string =>
	`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street}, ${a.district}, ${a.city} - ${a.state}`)}`;
