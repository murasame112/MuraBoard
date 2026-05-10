import {createContext, useContext, useState} from 'react';
import type { Language } from './Language';

type LanguageContextProvider = {
	language: Language;
	selectLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProvider | undefined>(undefined);

export function LanguageProvider({children}: {children: React.ReactNode}) {
	const [language, setLanguage] = useState<Language>('en');

	function selectLanguage(lang: Language = 'en') {
		setLanguage(lang);
	}

	return (<LanguageContext.Provider value={{language, selectLanguage}}>{children}</LanguageContext.Provider>);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) throw new Error('useLanguage should be used inside LanguageProvider');
	return context;
}