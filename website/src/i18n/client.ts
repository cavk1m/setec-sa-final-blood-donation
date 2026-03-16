'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import kh from './kh.json';

const resources = {
  en: { translation: en },
  kh: { translation: kh },
};

const getStoredLanguageImpl = (): string => {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem(LOCALE_STORAGE_KEY) as 'en' | 'kh') || 'en';
};

const LOCALE_STORAGE_KEY = 'hopeflow-locale';

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
});

// Restore saved language on client as soon as module loads (reduces flash)
if (typeof window !== 'undefined') {
  const stored = getStoredLanguageImpl();
  if (stored && stored !== i18n.language) {
    i18n.changeLanguage(stored);
  }
}

export { LOCALE_STORAGE_KEY, getStoredLanguageImpl as getStoredLanguage };
export default i18n;
