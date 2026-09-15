/**
 * Latin files of the core fonts, for <link rel="preload">. Same Vite asset as the
 * @fontsource CSS references, so the preload is reused, not downloaded twice.
 * Without it the browser only finds them after the CSS, paints big headlines in
 * the fallback and reflows on swap (desktop CLS). Skip it on templates that set
 * their own faces (Sálvia), or it downloads fonts the page never uses.
 */
import inter from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import mono from '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url';

export const PRELOAD_FONTS: readonly string[] = [inter, mono];
