/**
 * Server-side i18n. Locale comes from the URL (Astro i18n routing):
 *   /          → pt (default, no prefix)
 *   /en/...    → en
 *
 * Usage in a component:
 *   const locale = localeOf(Astro);
 *   const t = useT(locale);            // typed dictionary
 *   <h1>{t.hero.headline}</h1>
 *   <a href={localePath(locale, '/work')}>…</a>
 *
 * No client-side text swapping. The language switch is a plain link.
 */
import { pt } from './pt';
import { en } from './en';

export type Locale = 'pt' | 'en';
export const LOCALES = ['pt', 'en'] as const satisfies readonly Locale[];
export const DEFAULT_LOCALE: Locale = 'pt';
export const LANG_TAG: Record<Locale, string> = { pt: 'pt-BR', en: 'en' };
export const OG_LOCALE: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' };
export const LOCALE_NAME: Record<Locale, string> = { pt: 'Português', en: 'English' };

export const dict = { pt, en } as const;
export type Dict = typeof pt;

export function localeOf(astro: { currentLocale?: string | undefined }): Locale {
	return astro.currentLocale === 'en' ? 'en' : 'pt';
}

export function useT(locale: Locale): Dict {
	return dict[locale] as Dict;
}

export function pick<T>(value: { pt: T; en: T }, locale: Locale): T {
	return value[locale];
}

export function altLocale(locale: Locale): Locale {
	return locale === 'pt' ? 'en' : 'pt';
}

/** Remove a leading `/en` from a pathname. */
export function stripLocale(pathname: string): string {
	const p = pathname.replace(/^\/en(?=\/|$)/, '');
	return p === '' ? '/' : p;
}

/** Prefix a site path with the locale segment when needed. `path` must start with '/'. */
export function localePath(locale: Locale, path: string): string {
	const clean = stripLocale(path);
	if (locale === 'pt') return clean;
	if (clean === '/') return '/en';
	// '/#contato' → '/en#contato', '/?template=x#contato' → '/en?template=x#contato'
	// (trailingSlash is 'never', so '/en/#x' would bounce through a redirect).
	if (clean.startsWith('/#') || clean.startsWith('/?')) return `/en${clean.slice(1)}`;
	return `/en${clean}`;
}

/** Same page in the other language. */
export function switchPath(locale: Locale, pathname: string): string {
	return localePath(altLocale(locale), stripLocale(pathname));
}

/** Tiny `{name}` interpolation for dictionary strings. */
export function fmt(template: string, vars: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}
