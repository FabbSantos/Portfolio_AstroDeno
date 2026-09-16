/**
 * Atelier's display face (Fraunces, upright and italic, weight axis only),
 * preloaded so the hero title paints in it on first render. Figtree (text)
 * swaps in without a visible jump and is not preloaded.
 */
import display from '@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2?url';
import displayItalic from '@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2?url';

export const ATELIER_PRELOAD: readonly string[] = [display, displayItalic];
