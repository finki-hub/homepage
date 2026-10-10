import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { type Language, translations } from '@/lib/i18n';
import { readBrowserStorage, writeBrowserStorage } from '@/lib/safe-storage';

import { LanguageContext } from './LanguageContext';

export const LanguageProvider = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = readBrowserStorage('finki-hub-lang');
    if (saved === 'mk' || saved === 'en') {
      return saved;
    }

    return 'mk';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    writeBrowserStorage('finki-hub-lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  const contextValue = useMemo(
    () => ({ language, setLanguage: handleSetLanguage, t }),
    [language, t],
  );

  return <LanguageContext value={contextValue}>{children}</LanguageContext>;
};
