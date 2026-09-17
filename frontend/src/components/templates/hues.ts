/**
 * One colour per template kind (what the site does) — shared by TemplateCard and the gallery's
 * compare strip so a template reads the same everywhere.
 *
 * `hue`  bright value for dots, rings and chip backgrounds.
 * `text` AA-safe variant (≥ 4.5:1 on --bg, --bg-2 and the kind's own soft chip)
 * for 11–12px labels; `textDark` is the same for the dark theme. base.css picks
 * one into `--hue-text` on any element carrying `data-hue`.
 */
import type { TemplateKind } from '../../data/templates';

export const TEMPLATE_HUES: Record<TemplateKind, { hue: string; text: string; textDark: string }> = {
	menu: { hue: '#d99a00', text: '#855700', textDark: '#f5c451' }, // mustard, text 6.1:1 on --bg
	leads: { hue: '#b45309', text: '#ad5009', textDark: '#fbbf24' }, // amber, text 5.2:1 on --bg, 4.5:1 on its chip
	product: { hue: '#ff5c3d', text: '#c2410c', textDark: '#ff9a82' }, // coral, text 5.2:1
	portfolio: { hue: '#7c3aed', text: '#7c3aed', textDark: '#b8a2ff' }, // violet, 5.7:1
	storefront: { hue: '#16a34a', text: '#14793a', textDark: '#4ade80' }, // green, text 5.3:1 on --bg, 4.6:1 on its chip
	booking: { hue: '#3b7457', text: '#3b7457', textDark: '#8fd3ac' }, // sage, 5.3:1 on --bg, 4.7:1 on its chip
};

function rgba(hex: string, alpha: number): string {
	const n = parseInt(hex.slice(1), 16);
	return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Inline-style fragment: `--hue`, both `--hue-text` variants and `--hue-soft` for one kind.
 *  The element must also carry `data-hue` so base.css resolves `--hue-text` per theme. */
export function hueVars(kind: TemplateKind): string {
	const { hue, text, textDark } = TEMPLATE_HUES[kind];
	return `--hue:${hue};--hue-text-l:${text};--hue-text-d:${textDark};--hue-soft:${rgba(hue, 0.12)}`;
}
