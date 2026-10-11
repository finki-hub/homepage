import { createContext } from 'react';

import type { Language, Translations } from '@/lib/i18n';

export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

LanguageContext.displayName = 'LanguageContext';
