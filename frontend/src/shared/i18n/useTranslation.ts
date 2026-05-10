import { useLanguage } from "../../contexts/language/LanguageProvider";
import { t } from '.';

export function useTranslation() {
	const {language} = useLanguage();

	return {
		t: (key: string) => t(key, language)
	}
}