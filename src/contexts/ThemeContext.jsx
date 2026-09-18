import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => localStorage.getItem('sk-theme') || 'system');
  const [contrast, setContrastState] = useState(() => localStorage.getItem('sk-contrast') === '1');
  const [fontScale, setFontScaleState] = useState(() => localStorage.getItem('sk-font-scale') || 'normal');

  useEffect(() => {
    const applyTheme = () => {
      let effectiveTheme = theme;
      if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', effectiveTheme);
      document.documentElement.setAttribute('data-contrast', contrast ? 'high' : 'normal');
      document.documentElement.setAttribute('data-font-scale', fontScale === 'normal' ? '' : fontScale);
    };

    applyTheme();
    localStorage.setItem('sk-theme', theme);
    localStorage.setItem('sk-contrast', contrast ? '1' : '0');
    localStorage.setItem('sk-font-scale', fontScale);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') applyTheme();
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, contrast, fontScale]);

  const cycleTheme = () => {
    setThemeState((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  const toggleContrast = () => setContrastState((prev) => !prev);
  const setFontScale = (scale) => setFontScaleState(scale);

  return (
    <ThemeContext.Provider value={{ theme, contrast, fontScale, cycleTheme, toggleContrast, setFontScale }}>
      {children}
    </ThemeContext.Provider>
  );
};
