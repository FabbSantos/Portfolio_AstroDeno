/**
 * Animated <details>: the height eases open and closed and the answer fades
 * and rises in. Progressive enhancement over the native element, so it still
 * works without JS and keeps keyboard and find-in-page behaviour.
 *
 * Opt in with `<details data-accordion>`; call `enhanceAccordions()` once per
 * page (it is idempotent). Clicking mid-animation reverses from where it is.
 * Under prefers-reduced-motion nothing is attached (native instant toggle).
 *
 * While closing, the element carries `.is-closing` so icons turn back at the
 * start of the animation instead of the end: style them with
 * `details[open]:not(.is-closing)`.
 */
const DURATION = 440;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export function enhanceAccordions(root: ParentNode = document): void {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	root.querySelectorAll<HTMLDetailsElement>('details[data-accordion]:not([data-accordion-ready])').forEach(setup);
}

function setup(el: HTMLDetailsElement): void {
	const summary = el.querySelector(':scope > summary');
	if (!(summary instanceof HTMLElement)) return;
	el.dataset.accordionReady = '';

	let height: Animation | null = null;
	let content: Animation[] = [];
	const body = () => Array.from(el.children).filter((c): c is HTMLElement => c instanceof HTMLElement && c !== summary);

	/**
	 * The element's resting height in a given state, measured from real layout
	 * (so margins that collapse out of it are handled) and restored in the same
	 * task, before anything paints.
	 */
	const restingHeight = (open: boolean) => {
		const was = { open: el.open, height: el.style.height, overflow: el.style.overflow };
		el.open = open;
		el.style.height = '';
		el.style.overflow = '';
		const h = el.offsetHeight;
		el.open = was.open;
		el.style.height = was.height;
		el.style.overflow = was.overflow;
		return h;
	};

	const stop = () => {
		height?.cancel();
		content.forEach((a) => a.cancel());
		height = null;
		content = [];
	};

	const finish = (open: boolean) => {
		stop();
		el.open = open;
		el.classList.remove('is-closing');
		el.style.height = '';
		el.style.overflow = '';
	};

	summary.addEventListener('click', (e) => {
		e.preventDefault();
		const from = el.offsetHeight; // includes any running animation
		const opening = !el.open || el.classList.contains('is-closing');
		stop();
		const to = restingHeight(opening);
		el.style.overflow = 'hidden';

		if (opening) {
			el.classList.remove('is-closing');
			el.style.height = `${from}px`;
			el.open = true;
			height = el.animate({ height: [`${from}px`, `${to}px`] }, { duration: DURATION, easing: EASE });
			content = body().map((c) =>
				c.animate({ opacity: [0, 1], transform: ['translateY(-8px)', 'translateY(0)'] }, { duration: DURATION, easing: EASE, delay: 60, fill: 'backwards' })
			);
			height.onfinish = () => finish(true);
		} else {
			el.classList.add('is-closing');
			height = el.animate({ height: [`${from}px`, `${to}px`] }, { duration: DURATION * 0.8, easing: EASE });
			content = body().map((c) => c.animate({ opacity: [1, 0] }, { duration: DURATION * 0.45, easing: EASE, fill: 'forwards' }));
			height.onfinish = () => finish(false);
		}
	});
}
