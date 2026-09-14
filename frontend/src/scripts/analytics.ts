/**
 * Lead funnel events. One call fans out to every analytics backend the site has:
 *  - Vercel Web Analytics `track()`: custom events only count on the Pro plan,
 *    so on Hobby this is a no-op that starts working after an upgrade.
 *  - Umami (cookieless), when PUBLIC_UMAMI_WEBSITE_ID is set. Its script loads
 *    after `load` (see Layout), so events fired before that wait in a queue the
 *    loader flushes.
 *
 * Funnel: contact_view → form_start → contact_submit (contact_error on failure).
 * Entry points: cta_click and whatsapp_click, each with `where` (section id,
 * topbar, menu, footer, fab…) and `page`.
 */
import { track as vercelTrack } from '@vercel/analytics';

type Props = Record<string, string | number | boolean | null>;

declare global {
	interface Window {
		umami?: { track: (name: string, data?: Props) => void };
		__umq?: [string, Props][];
	}
}

export function trackEvent(name: string, props: Props = {}): void {
	try {
		vercelTrack(name, props);
	} catch {
		/* analytics must never break the page */
	}
	if (window.umami) window.umami.track(name, props);
	else (window.__umq ??= []).push([name, props]);
}

/** Where a link sits: explicit data-cta, else its section id, else the page chrome. */
function whereOf(el: Element): string {
	const explicit = el.closest<HTMLElement>('[data-cta]')?.dataset.cta;
	if (explicit) return explicit;
	const section = el.closest('section[id]')?.id;
	if (section) return section;
	if (el.closest('header nav')) return 'menu';
	if (el.closest('header')) return 'topbar';
	if (el.closest('footer')) return 'footer';
	if (el.closest('.hero-stage')) return 'hero';
	return 'page';
}

/** One delegated listener: every link to the contact form and every WhatsApp link. */
export function initCtaTracking(): void {
	document.addEventListener(
		'click',
		(e) => {
			const a = (e.target as Element | null)?.closest?.('a[href]');
			if (!a) return;
			const href = a.getAttribute('href') ?? '';
			const props = { where: whereOf(a), page: location.pathname };
			if (href.includes('#contato')) trackEvent('cta_click', props);
			else if (/wa\.me|whatsapp\.com/.test(href)) trackEvent('whatsapp_click', props);
		},
		{ capture: true, passive: true }
	);
}
