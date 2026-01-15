import { createContext } from 'react';

import type { Language, translations } from '@/lib/i18n';

export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

type Translations = typeof translations.en | typeof translations.mk;

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

LanguageContext.displayName = 'LanguageContext';
