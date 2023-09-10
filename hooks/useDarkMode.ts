import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useDarkMode = (defaultValue?: boolean) => {
  const osColor =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    'dark-mode',
    defaultValue ?? osColor ?? false
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-mode', 'dark');
    } else {
      document.documentElement.setAttribute('data-mode', 'light');
    }
  }, [isDarkMode]);

  const toggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return { isDarkMode, toggle };
};
