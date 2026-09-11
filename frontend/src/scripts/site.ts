/**
 * Shared, lightweight site interactions:
 *  - sticky topbar blur on scroll
 *  - IntersectionObserver scroll reveal (.reveal -> .in)
 *  - draggable horizontal scroller (.scroller) — mouse only; touch scrolls natively
 *  - mobile nav toggle (with `inert` on the closed menu)
 * Language switching is a plain link now (server-side i18n) — nothing to wire.
 */

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
	initScrollers();
	initMobileNav();
}
