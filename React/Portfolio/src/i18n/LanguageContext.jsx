import { createContext, useState, useEffect, useContext } from 'react';
import { translations } from './translations';

export const LanguageContext = createContext();

// Get language from localStorage or browser default
const getInitialLang = () => {
  const stored = localStorage.getItem('portfolio_lang');
  if (stored === 'en' || stored === 'fr' || stored === 'es') return stored;
  
  // Detect browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('es')) return 'es';
  return 'en';
};

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang());

  const setLang = (newLang) => {
    if (newLang !== 'en' && newLang !== 'fr' && newLang !== 'es') return;
    setLangState(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  // Get translation by path (e.g., 'index.play')
  const t = (path) => {
    const keys = path.split('.');
    let value = translations[lang];

    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        return path; // Return path if not found
      }
    }
    
    return (value === undefined || value === null) ? path : value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
