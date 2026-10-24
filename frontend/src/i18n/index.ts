/**
 * Server-side i18n. Locale comes from the URL (Astro i18n routing):
 *   /          → pt (default, no prefix)
 *   /en/...    → en
 *   /es/...    → es
 *
 * Usage in a component:
 *   const locale = localeOf(Astro);
 *   const t = useT(locale);            // typed dictionary
 *   <h1>{t.hero.headline}</h1>
 *   <a href={localePath(locale, '/work')}>…</a>
 *
 * No client-side text swapping. The language switch is a plain link. On a
 * visitor's first page, a tiny head script in Layout may move them once to
 * the version in their browser's language (see components/site/LangRedirect).
 */
import { pt } from './pt';
import { en } from './en';
import { es } from './es';

export type Locale = 'pt' | 'en' | 'es';
export const LOCALES = ['pt', 'en', 'es'] as const satisfies readonly Locale[];
export const DEFAULT_LOCALE: Locale = 'pt';
export const LANG_TAG: Record<Locale, string> = { pt: 'pt-BR', en: 'en', es: 'es' };
export const OG_LOCALE: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_LA' };
export const LOCALE_NAME: Record<Locale, string> = { pt: 'Português', en: 'English', es: 'Español' };
/** Short code shown in the language switch. */
export const LOCALE_CODE: Record<Locale, string> = { pt: 'PT', en: 'EN', es: 'ES' };

export const dict = { pt, en, es } as const;
export type Dict = typeof pt;

export function localeOf(astro: { currentLocale?: string | undefined }): Locale {
	const l = astro.currentLocale;
	return l === 'en' || l === 'es' ? l : 'pt';
}

export function useT(locale: Locale): Dict {
	return dict[locale] as Dict;
}

export function pick<T>(value: Record<Locale, T>, locale: Locale): T {
	return value[locale];
}

/** Every language except `locale`, in switch order. */
export function otherLocales(locale: Locale): Locale[] {
	return LOCALES.filter((l) => l !== locale);
}

/** Remove a leading `/en` or `/es` from a pathname. */
export function stripLocale(pathname: string): string {
	const p = pathname.replace(/^\/(en|es)(?=\/|$)/, '');
	return p === '' ? '/' : p;
}

/** The privacy page is the one route with its own slug per language. */
export const PRIVACY_PATH: Record<Locale, string> = { pt: '/privacidade', en: '/privacy', es: '/privacidad' };
const PRIVACY_SLUGS = new Set(Object.values(PRIVACY_PATH));

/** Prefix a site path with the locale segment when needed. `path` must start with '/'. */
export function localePath(locale: Locale, path: string): string {
	let clean = stripLocale(path);
	if (PRIVACY_SLUGS.has(clean)) clean = PRIVACY_PATH[locale];
	if (locale === 'pt') return clean;
	if (clean === '/') return `/${locale}`;
	// '/#contato' → '/en#contato', '/?template=x#contato' → '/en?template=x#contato'
	// (trailingSlash is 'never', so '/en/#x' would bounce through a redirect).
	if (clean.startsWith('/#') || clean.startsWith('/?')) return `/${locale}${clean.slice(1)}`;
	return `/${locale}${clean}`;
}

/** The page at `pathname` in the `target` language. */
export function switchPath(target: Locale, pathname: string): string {
	return localePath(target, pathname);
}

/** Tiny `{name}` interpolation for dictionary strings. */
export function fmt(template: string, vars: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}
