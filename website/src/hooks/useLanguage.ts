import { useState } from 'react';

export function useLanguage(namespace: string) {
  const [language, setLanguage] = useState('en');
  const t = (key: string) => key;
  return { language, setLanguage, t };
}