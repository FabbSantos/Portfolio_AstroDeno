/**
 * One colour per template kind (what the site does) — shared by TemplateCard and the gallery's
 * compare strip so a template reads the same everywhere.
 *
 * `hue`  bright value for dots, rings and chip backgrounds.
 * `text` AA-safe variant (≥ 4.5:1 on --bg, --bg-2 and the kind's own soft chip)
 * for 11–12px labels.
 */
import type { TemplateKind } from '../../data/templates';

export const TEMPLATE_HUES: Record<TemplateKind, { hue: string; text: string }> = {
	leads: { hue: '#b45309', text: '#ad5009' }, // amber, text 5.2:1 on --bg, 4.5:1 on its chip
	product: { hue: '#ff5c3d', text: '#c2410c' }, // coral, text 5.2:1
	portfolio: { hue: '#7c3aed', text: '#7c3aed' }, // violet, 5.7:1
	storefront: { hue: '#16a34a', text: '#14793a' }, // green, text 5.3:1 on --bg, 4.6:1 on its chip
	booking: { hue: '#3b7457', text: '#3b7457' }, // sage, 5.3:1 on --bg, 4.7:1 on its chip
};

function rgba(hex: string, alpha: number): string {
	const n = parseInt(hex.slice(1), 16);
	return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Inline-style fragment: `--hue`, `--hue-text` and `--hue-soft` for one kind. */
export function hueVars(kind: TemplateKind): string {
	const { hue, text } = TEMPLATE_HUES[kind];
	return `--hue:${hue};--hue-text:${text};--hue-soft:${rgba(hue, 0.12)}`;
}
