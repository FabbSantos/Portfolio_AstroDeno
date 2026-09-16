/**
 * Stratus' single face: Archivo with the width axis (62 to 125), so titles can
 * run wide and text stays normal from one file. Preloaded so the hero paints
 * in it on first render; JetBrains Mono comes from the core.
 */
import archivo from '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url';
import mono from '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url';

export const STRATUS_PRELOAD: readonly string[] = [archivo, mono];
