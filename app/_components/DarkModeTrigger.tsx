'use client';

import { useDarkMode } from '@/hooks/useDarkMode';
import { useEffect } from 'react';

export const DarkModeTrigger = () => {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-mode', 'dark');
    } else {
      document.documentElement.setAttribute('data-mode', 'light');
    }
  }, [isDarkMode]);

  return null;
};
