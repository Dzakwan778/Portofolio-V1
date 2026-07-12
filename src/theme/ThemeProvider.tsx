import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from './themes';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    // 1. Saved LocalStorage
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
    if (savedTheme && ['light', 'dark', 'amoled', 'midnight'].includes(savedTheme)) {
      setThemeState(savedTheme);
      return;
    }

    // 2. System Preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.matches) {
      setThemeState('dark');
      return;
    }

    // 3. Default
    setThemeState('light');
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'amoled', 'midnight');
    root.classList.add(theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
