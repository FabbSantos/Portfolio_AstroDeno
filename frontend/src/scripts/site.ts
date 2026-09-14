/**
 * Shared, lightweight site interactions:
 *  - sticky topbar blur on scroll
 *  - IntersectionObserver scroll reveal (.reveal -> .in)
 *  - count-up numbers ([data-count]) when they scroll into view
 *  - marquee slow-down on hover (playbackRate — no jump, unlike changing duration)
 *  - draggable horizontal scroller (.scroller) — mouse only; touch scrolls natively
 *  - mobile nav toggle (with `inert` on the closed menu)
 * Language switching is a plain link now (server-side i18n) — nothing to wire.
 */

const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Calls `cb(true)` while the page is scrolled more than `px`, `cb(false)` above it.
 * Watches a 1px sentinel with IntersectionObserver: reading `window.scrollY` on
 * load forces a synchronous layout of the whole page.
 */
export function onScrolledPast(px: number, cb: (past: boolean) => void): void {
	const sentinel = document.createElement('div');
	sentinel.setAttribute('aria-hidden', 'true');
	sentinel.style.cssText = `position:absolute;top:${px}px;left:0;width:1px;height:1px;visibility:hidden;pointer-events:none`;
	document.body.prepend(sentinel);
	new IntersectionObserver(([e]) => e && cb(!e.isIntersecting && e.boundingClientRect.top < 0)).observe(sentinel);
}

function initStickyTopbar(): void {
	const tb = document.getElementById('topbar');
	if (!tb || !('IntersectionObserver' in window)) return;
	onScrolledPast(12, (past) => tb.classList.toggle('is-scrolled', past));
}

function initReveal(): void {
	const els = document.querySelectorAll<HTMLElement>('.reveal');
	if (!els.length) return;
	if (!('IntersectionObserver' in window)) {
		els.forEach((el) => el.classList.add('in'));
		return;
	}
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

/**
 * Count-up: `<span data-count="20" data-suffix="+">20+</span>` animates 0→20
 * over ~900ms (ease-out cubic) the first time it enters the viewport. The SSR
 * text is already the final value, so no-JS and reduced-motion just keep it.
 * Width is locked to the final text before counting → no layout shift.
 */
function initCountUp(): void {
	const els = document.querySelectorAll<HTMLElement>('[data-count]');
	if (!els.length || reducedMotion() || !('IntersectionObserver' in window)) return;

	const DURATION = 900;
	const run = (el: HTMLElement) => {
		const target = Number(el.dataset.count);
		if (!Number.isFinite(target)) return;
		const suffix = el.dataset.suffix ?? '';
		const prefix = el.dataset.prefix ?? '';
		const finalText = (el.textContent ?? '').trim() || `${prefix}${target}${suffix}`;
		el.style.minWidth = `${el.getBoundingClientRect().width}px`;
		const start = performance.now();
		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / DURATION);
			const eased = 1 - Math.pow(1 - t, 3);
			el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
			if (t < 1) requestAnimationFrame(tick);
			else el.textContent = finalText;
		};
		el.textContent = `${prefix}0${suffix}`;
		requestAnimationFrame(tick);
	};

	const io = new IntersectionObserver(
		(entries) =>
			entries.forEach((e) => {
				if (e.isIntersecting) {
					run(e.target as HTMLElement);
					io.unobserve(e.target);
				}
			}),
		{ threshold: 0.4 }
	);
	els.forEach((el) => io.observe(el));
}

/**
 * Marquee: slow the CSS animation to ~1/3 speed while hovered instead of
 * pausing. Uses the Web Animations playbackRate so the current position is
 * kept (changing animation-duration would make the track jump).
 */
function initMarquees(): void {
	document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((m) => {
		const rate = Number(m.dataset.marqueeHoverRate) || 0.35;
		const rows = () => Array.from(m.querySelectorAll<HTMLElement>('[data-marquee-row]')).flatMap((r) => r.getAnimations());
		const set = (r: number) => rows().forEach((a) => (a.playbackRate = r));
		m.addEventListener('mouseenter', () => set(rate));
		m.addEventListener('mouseleave', () => set(1));
	});
}

function initScrollers(): void {
	document.querySelectorAll<HTMLElement>('.scroller').forEach((sc) => {
		let down = false;
		let startX = 0;
		let startScroll = 0;
		let moved = 0;

		sc.addEventListener('pointerdown', (e) => {
			if (e.pointerType === 'touch') return; // native touch scrolling
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

		// prev/next buttons (optional): <button data-scroll="prev|next" data-for="#id">
		document.querySelectorAll<HTMLButtonElement>(`[data-scroll][data-for="#${sc.id}"]`).forEach((btn) => {
			btn.addEventListener('click', () => {
				const card = sc.querySelector<HTMLElement>('[data-card]');
				const step = card ? card.offsetWidth + 20 : sc.clientWidth * 0.8;
				sc.scrollBy({ left: btn.dataset.scroll === 'prev' ? -step : step, behavior: 'smooth' });
			});
		});
	});
}

function initMobileNav(): void {
	const tb = document.getElementById('topbar');
	const toggle = document.getElementById('nav-toggle');
	const nav = document.getElementById('nav-mini');
	if (!tb || !toggle || !nav) return;

	const mq = window.matchMedia('(max-width: 780px)');
	const setOpen = (open: boolean) => {
		tb.classList.toggle('nav-open', open);
		toggle.setAttribute('aria-expanded', String(open));
		if (mq.matches) nav.toggleAttribute('inert', !open);
		else nav.removeAttribute('inert');
	};
	setOpen(false);
	mq.addEventListener('change', () => setOpen(tb.classList.contains('nav-open')));
	toggle.addEventListener('click', () => setOpen(!tb.classList.contains('nav-open')));
	nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && tb.classList.contains('nav-open')) setOpen(false);
	});
}

export function initSite(): void {
	initStickyTopbar();
	initReveal();
	initCountUp();
	initMarquees();
	initScrollers();
	initMobileNav();
}
