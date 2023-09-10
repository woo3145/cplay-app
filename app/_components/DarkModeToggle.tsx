'use client';

import { useDarkMode } from '@/hooks/useDarkMode';
import { useIsMounted } from '@/hooks/useIsMounted';
import { BsMoon, BsSun } from 'react-icons/bs';

export const DarkModeToggle = () => {
  const { isDarkMode, toggle } = useDarkMode();
  const isMounted = useIsMounted();

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2.5 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer"
    >
      {isMounted() && isDarkMode ? <BsMoon /> : <BsSun />}
    </button>
  );
};
