import React, { createContext, useState, useEffect } from 'react';
import { en } from '../locales/en.js';
import { hi } from '../locales/hi.js';
import { bn } from '../locales/bn.js';
import { ta } from '../locales/ta.js';
import { mr } from '../locales/mr.js';
import { or } from '../locales/or.js';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', speechCode: 'hi-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechCode: 'bn-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechCode: 'mr-IN' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', speechCode: 'or-IN' },
];

const dictionaries = { en, hi, bn, ta, mr, or };

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem('sk-lang');
    if (saved && dictionaries[saved]) return saved;
    const nav = navigator.language || 'en';
    if (nav.startsWith('hi')) return 'hi';
    if (nav.startsWith('bn')) return 'bn';
    if (nav.startsWith('ta')) return 'ta';
    if (nav.startsWith('mr')) return 'mr';
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('sk-lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const setLang = (newLang) => {
    if (dictionaries[newLang]) {
      setLangState(newLang);
    }
  };

  const t = (key, fallback) => {
    return dictionaries[lang]?.[key] || dictionaries['en']?.[key] || fallback || key;
  };

  const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, supportedLanguages: SUPPORTED_LANGUAGES, currentLangMeta }}>
      {children}
    </LanguageContext.Provider>
  );
};
