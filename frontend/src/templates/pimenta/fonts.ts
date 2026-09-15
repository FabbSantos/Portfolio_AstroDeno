/**
 * Pimenta's display face, preloaded so the giant hero title paints in it (the
 * text face swaps without a visible jump). Same Vite asset the @fontsource CSS
 * references, so the file is fetched once.
 */
import display from '@fontsource-variable/big-shoulders-display/files/big-shoulders-display-latin-wght-normal.woff2?url';

export const PIMENTA_PRELOAD: readonly string[] = [display];
