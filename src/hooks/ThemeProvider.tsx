import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { type Theme, ThemeContext } from './ThemeContext';

const STORAGE_KEY = 'finki-hub-theme';

const getInitialTheme = (): Theme => {
  const savedTheme = globalThis.localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const ThemeProvider = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.dataset['kbTheme'] = theme;
    document.documentElement.style.colorScheme = theme;
    globalThis.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const contextValue = useMemo(
    () => ({ setTheme, theme, toggleTheme }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
