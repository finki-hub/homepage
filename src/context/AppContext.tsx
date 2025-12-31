import {
  createContext,
  createSignal,
  type JSX,
  onMount,
  useContext,
} from 'solid-js';

type Language = 'en' | 'mk';
type Theme = 'dark-mode' | 'light-mode';
type Translations = Record<Language, Record<string, unknown>>;

const LANG_KEY = 'app-lang';
const THEME_KEY = 'app-theme';
const DEFAULT_LANG: Language = 'mk';
const DEFAULT_THEME: Theme = 'dark-mode';

const logError = (message: string, error: unknown) => {
  console.error(message, error);
};

type AppContextType = {
  changeLanguage: (lang: Language) => void;
  getThemeIcon: () => string;
  isLoaded: () => boolean;
  lang: () => Language;
  t: (key: string) => string;
  theme: () => Theme;
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextType>();

export const AppProvider = (props: { children: JSX.Element }) => {
  const [lang, setLang] = createSignal<Language>(DEFAULT_LANG);
  const [theme, setTheme] = createSignal<Theme>(DEFAULT_THEME);
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [translations, setTranslations] = createSignal<Translations>({
    en: {},
    mk: {},
  });

  onMount(async () => {
    // Load translations
    try {
      const [enResponse, mkResponse] = await Promise.all([
        fetch('/i18n/en.json'),
        fetch('/i18n/mk.json'),
      ]);
      const en = (await enResponse.json()) as Record<string, unknown>;
      const mk = (await mkResponse.json()) as Record<string, unknown>;
      setTranslations({ en, mk });
    } catch (error) {
      logError('Failed to load translations:', error);
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

  const getThemeIcon = () => (theme() === 'light-mode' ? 'moon' : 'sun');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations()[lang()];

    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  const contextValue: AppContextType = {
    changeLanguage,
    getThemeIcon,
    isLoaded,
    lang,
    t,
    theme,
    toggleTheme,
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
