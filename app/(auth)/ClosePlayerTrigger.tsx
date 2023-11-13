'use client';

import { useUIStatusStore } from '@/store/useUIStatusStorage';
import { useEffect } from 'react';

export const ClosePlayerTrigger = () => {
  const closePlayer = useUIStatusStore((state) => state.closePlayer);

  useEffect(() => {
    closePlayer();
  }, [closePlayer]);

  return null;
};
