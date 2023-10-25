'use client';

import { useEffect } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';
import {
  PLAYER_LOCAL_STORAGE,
  initPlayerLocalStorage,
  isValidPlayerStoreState,
} from '@/store/playerLocalStorage';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const initPlayerStore = usePlayerStore((state) => state.initPlayerStore);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof Storage === 'undefined') {
      console.error('Local storage is not supported in this browser.');
      return;
    }

    try {
      const item = JSON.parse(
        localStorage.getItem(PLAYER_LOCAL_STORAGE) || '{}'
      );
      if (!isValidPlayerStoreState(item)) {
        throw new Error('Invalid player state in local storage');
      }
      initPlayerStore(item);
    } catch (error) {
      console.error('Failed to load player store from local storage:', error);
      initPlayerLocalStorage();
    }
  }, [initPlayerStore]);

  return children;
}
