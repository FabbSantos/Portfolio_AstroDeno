/**
 * Mirante's display face (Cormorant, upright and italic), preloaded so the
 * hero title paints in it on first render. Same Vite assets the @fontsource CSS
 * references, so each file is fetched once. Instrument Sans (text) swaps in
 * without a visible jump and is not preloaded.
 */
import display from '@fontsource-variable/cormorant/files/cormorant-latin-wght-normal.woff2?url';
import displayItalic from '@fontsource-variable/cormorant/files/cormorant-latin-wght-italic.woff2?url';

export const MIRANTE_PRELOAD: readonly string[] = [display, displayItalic];
