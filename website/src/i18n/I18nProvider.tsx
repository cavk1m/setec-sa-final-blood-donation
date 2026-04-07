'use client';

import { useLayoutEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { getStoredLanguage } from '@/src/i18n/client';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [localeRestored, setLocaleRestored] = useState(false);

  useLayoutEffect(() => {
    const stored = getStoredLanguage();
    if (stored && stored !== i18n.language) {
      i18n.changeLanguage(stored);
    }
    setLocaleRestored(true);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div
        className={localeRestored ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.08s ease-out' }}
      >
        {children}
      </div>
    </I18nextProvider>
  );
}
