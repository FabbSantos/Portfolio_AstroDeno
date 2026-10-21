/**
 * Analytics for client previews (/previas/<slug>, slug on <html data-previa>).
 *
 * Umami events, all with `previa`: whatsapp_click, maps_click, instagram_click
 * (with `where`, the section), promo_open (which promo), scroll_depth.
 * And two e-mails to the owner through /api/previa-aberta: when the preview is
 * opened (after a few seconds on the page, so link scanners and accidental
 * taps do not count) and when its WhatsApp button is tapped. Once per browser
 * session each, never from the owner's own browsers (?eu=1).
 */
import { initScrollDepth, isOwner, trackEvent, whereOf } from './analytics';

type PingEvent = 'open' | 'whatsapp';

export function initPreviaAnalytics(): void {
	const slug = document.documentElement.dataset.previa;
	if (!slug) return;

	// Automated browsers (PageSpeed / Lighthouse, test runners) are not prospects.
	const robot = navigator.webdriver || /Lighthouse|HeadlessChrome|PageSpeed/i.test(navigator.userAgent);

	const ping = (event: PingEvent) => {
		if (isOwner() || robot) return;
		const key = `previa-ping:${slug}:${event}`;
		try {
			if (sessionStorage.getItem(key)) return;
			sessionStorage.setItem(key, '1');
		} catch {
			/* no storage: ping anyway, the server dedupes */
		}
		let ref = '';
		try {
			ref = document.referrer ? new URL(document.referrer).host : '';
		} catch {
			/* malformed referrer */
		}
		fetch('/api/previa-aberta', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ slug, event, ref, path: location.pathname + location.search }),
			keepalive: true,
		}).catch(() => {});
	};

	document.addEventListener(
		'click',
		(e) => {
			const el = e.target as Element | null;
			const a = el?.closest?.('a[href]');
			if (a) {
				const href = a.getAttribute('href') ?? '';
				const props = { previa: slug, where: whereOf(a), page: location.pathname };
				if (/wa\.me|whatsapp\.com/.test(href)) {
					trackEvent('whatsapp_click', props);
					ping('whatsapp');
				} else if (/google\.[a-z.]+\/maps|maps\.google/.test(href)) trackEvent('maps_click', props);
				else if (/instagram\.com/.test(href)) trackEvent('instagram_click', props);
				return;
			}
			const promo = el?.closest?.<HTMLElement>('[data-promo-open]');
			if (promo) trackEvent('promo_open', { previa: slug, promo: Number(promo.dataset.promoOpen ?? 0) + 1 });
		},
		{ capture: true, passive: true },
	);

	initScrollDepth();
	window.setTimeout(() => ping('open'), 2500);
}
