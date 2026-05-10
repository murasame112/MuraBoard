import en from './en.json';
import pl from './pl.json';
import type { Language } from '../../contexts/language/Language';

const translations = {
	en: en,
	pl: pl
} as const;

export function t(key: string, language: Language = 'en'): string {
	return translations[language][key as keyof typeof  translations.en] ?? key;
}