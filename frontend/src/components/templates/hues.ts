/**
 * One colour per template kind — shared by TemplateCard and the gallery's
 * compare strip so a template reads the same everywhere.
 *
 * `hue`  bright value for dots, rings and chip backgrounds.
 * `text` AA-safe variant (≥ 4.5:1 on --bg) for 11–12px labels.
 */
import type { TemplateKind } from '../../data/templates';

export const TEMPLATE_HUES: Record<TemplateKind, { hue: string; text: string }> = {
	realestate: { hue: '#b45309', text: '#b45309' }, // amber — 5.0:1
	saas: { hue: '#ff5c3d', text: '#c2410c' }, // coral — text variant 5.2:1
	agency: { hue: '#7c3aed', text: '#7c3aed' }, // violet — 5.7:1
	shop: { hue: '#16a34a', text: '#15803d' }, // green — text variant 5.0:1
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
