/**
 * Mirante's display face (Cormorant, upright; titles are one style, so the
 * italic is not loaded), preloaded so the hero title paints in it on first
 * render. Same Vite asset the @fontsource CSS references, so the file is
 * fetched once. Instrument Sans (text) swaps in without a visible jump and is
 * not preloaded.
 */
import display from '@fontsource-variable/cormorant/files/cormorant-latin-wght-normal.woff2?url';

export const MIRANTE_PRELOAD: readonly string[] = [display];
