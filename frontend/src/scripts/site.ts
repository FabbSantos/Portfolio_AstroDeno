/**
 * Shared, lightweight site interactions (light theme).
 * Ported from the handoff prototypes:
 *  - sticky topbar blur on scroll
 *  - IntersectionObserver scroll reveal (.reveal -> .in)
 *  - draggable horizontal scroller (.scroller)
 *  - mobile nav toggle
 *  - language switch wiring (reuses i18n.ts)
 */
import { setLocale, getLocale } from '../i18n/i18n';

function initStickyTopbar(): void {
	const tb = document.getElementById('topbar');
	if (!tb) return;
	const onScroll = () => tb.classList.toggle('is-scrolled', window.scrollY > 12);
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();
}

function initReveal(): void {
	const els = document.querySelectorAll<HTMLElement>('.reveal');
	if (!els.length) return;
	const io = new IntersectionObserver(
		(entries) =>
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add('in');
					io.unobserve(e.target);
				}
			}),
		{ threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
	);
	els.forEach((el) => io.observe(el));
}

function initScrollers(): void {
	document.querySelectorAll<HTMLElement>('.scroller').forEach((sc) => {
		let down = false;
		let startX = 0;
		let startScroll = 0;
		let moved = 0;

		sc.addEventListener('pointerdown', (e) => {
			down = true;
			moved = 0;
			startX = e.clientX;
			startScroll = sc.scrollLeft;
		});
		sc.addEventListener('pointermove', (e) => {
			if (!down) return;
			const dx = e.clientX - startX;
			moved = Math.abs(dx);
			if (moved > 8) {
				sc.classList.add('is-dragging');
				sc.scrollLeft = startScroll - dx;
			}
		});
		const release = () => {
			down = false;
			setTimeout(() => sc.classList.remove('is-dragging'), 50);
		};
		sc.addEventListener('pointerup', release);
		sc.addEventListener('pointercancel', release);
		sc.addEventListener('pointerleave', release);
		// Prevent click only if actually dragged
		sc.addEventListener(
			'click',
			(e) => {
				if (moved > 8) {
					e.preventDefault();
					e.stopPropagation();
				}
			},
			true
		);
	});
}

function initMobileNav(): void {
	const tb = document.getElementById('topbar');
	const toggle = document.getElementById('nav-toggle');
	const nav = document.getElementById('nav-mini');
	if (!tb || !toggle || !nav) return;

	const setOpen = (open: boolean) => {
		tb.classList.toggle('nav-open', open);
		toggle.setAttribute('aria-expanded', String(open));
	};
	toggle.addEventListener('click', () => setOpen(!tb.classList.contains('nav-open')));
	nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

function initLangSwitch(): void {
	const langSwitch = document.getElementById('lang-switch');
	if (!langSwitch) return;

	const current = getLocale();
	langSwitch.classList.toggle('pt', current === 'pt');
	langSwitch.querySelectorAll<HTMLElement>('.lang-option').forEach((opt) => {
		opt.classList.toggle('active', opt.dataset.lang === current);
		opt.addEventListener('click', () => {
			const lang = opt.dataset.lang as 'en' | 'pt';
			if (!lang || lang === getLocale()) return;
			setLocale(lang); // applyTranslations() updates the switch visual + all [data-i18n]
		});
	});
}

export function initSite(): void {
	initStickyTopbar();
	initReveal();
	initScrollers();
	initMobileNav();
	initLangSwitch();
}
