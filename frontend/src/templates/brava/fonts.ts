/**
 * Brava's display face (Bodoni Moda, upright and italic, weight axis only),
 * preloaded so the brand and the hero title paint in it on first render.
 * Manrope (text, prices, countdown) swaps in without a visible jump.
 */
import display from '@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-normal.woff2?url';
import displayItalic from '@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-italic.woff2?url';

export const BRAVA_PRELOAD: readonly string[] = [display, displayItalic];
