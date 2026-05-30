import { translations, type Locale } from './translations';

const STORAGE_KEY = 'portfolio-lang';

export function getLocale(): Locale {
	if (typeof window === 'undefined') return 'en';
	const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
	if (saved && (saved === 'en' || saved === 'pt')) return saved;
	const browserLang = navigator.language.toLowerCase();
	return browserLang.startsWith('pt') ? 'pt' : 'en';
}

export function setLocale(locale: Locale): void {
	localStorage.setItem(STORAGE_KEY, locale);
	applyTranslations(locale);
	document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
	window.dispatchEvent(new CustomEvent('locale-changed', { detail: locale }));
}

export function t(key: string, locale?: Locale): string {
	const lang = locale || getLocale();
	return translations[lang][key] || translations['en'][key] || key;
}

export function applyTranslations(locale?: Locale): void {
	const lang = locale || getLocale();
	const elements = document.querySelectorAll<HTMLElement>('[data-i18n]');

	elements.forEach((el) => {
		const key = el.getAttribute('data-i18n')!;
		const text = t(key, lang);
		if (text) el.textContent = text;
	});

	// Update pill switcher state
	const langSwitch = document.getElementById('lang-switch');
	if (langSwitch) {
		langSwitch.classList.toggle('pt', lang === 'pt');
		langSwitch.querySelectorAll('.lang-option').forEach((opt) => {
			opt.classList.toggle('active', (opt as HTMLElement).dataset.lang === lang);
		});
	}
}

export function initI18n(): void {
	const locale = getLocale();
	document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
	applyTranslations(locale);
}
