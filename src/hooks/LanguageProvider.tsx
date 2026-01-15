import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { type Language, translations } from '@/lib/i18n';

import { LanguageContext } from './LanguageContext';

export const LanguageProvider = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('finki-hub-lang');
      if (saved === 'mk' || saved === 'en') {
        return saved;
      }
    }
    return 'mk';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('finki-hub-lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  const contextValue = useMemo(
    () => ({ language, setLanguage: handleSetLanguage, t }),
    [language, t],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
