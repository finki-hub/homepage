import { createContext, useContext, createSignal, onMount } from 'solid-js';
import type { JSX } from 'solid-js';

type Language = 'en' | 'mk';
type Theme = 'light-mode' | 'dark-mode';

const LANG_KEY = 'app-lang';
const THEME_KEY = 'app-theme';
const DEFAULT_LANG: Language = 'mk';
const DEFAULT_THEME: Theme = 'dark-mode';

interface AppContextType {
  lang: () => Language;
  theme: () => Theme;
  isLoaded: () => boolean;
  t: (key: string) => string;
  changeLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  getThemeIcon: () => string;
}

const AppContext = createContext<AppContextType>();

export const AppProvider = (props: { children: JSX.Element }) => {
  const [lang, setLang] = createSignal<Language>(DEFAULT_LANG);
  const [theme, setTheme] = createSignal<Theme>(DEFAULT_THEME);
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [translations, setTranslations] = createSignal<Record<Language, Record<string, any>>>({
    en: {},
    mk: {}
  });

  onMount(async () => {
    // Load translations
    try {
      const [enResponse, mkResponse] = await Promise.all([
        fetch('/i18n/en.json'),
        fetch('/i18n/mk.json')
      ]);
      const en = await enResponse.json();
      const mk = await mkResponse.json();
      setTranslations({ en, mk });
    } catch (error) {
      console.error('Failed to load translations:', error);
    }

    // Initialize language from localStorage
    const storedLang = localStorage.getItem(LANG_KEY);
    if (storedLang === 'en' || storedLang === 'mk') {
      setLang(storedLang);
    }

    // Initialize theme from localStorage
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === 'light-mode' || storedTheme === 'dark-mode') {
      setTheme(storedTheme);
      document.body.classList.remove('light-mode', 'dark-mode');
      document.body.classList.add(storedTheme);
    }

    setIsLoaded(true);
  });

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem(LANG_KEY, newLang);
  };

  const toggleTheme = () => {
    const newTheme = theme() === 'light-mode' ? 'dark-mode' : 'light-mode';
    setTheme(newTheme);
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  const getThemeIcon = () => {
    return theme() === 'light-mode' ? 'moon' : 'sun';
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations()[lang()];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  const contextValue: AppContextType = {
    lang,
    theme,
    isLoaded,
    t,
    changeLanguage,
    toggleTheme,
    getThemeIcon
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
