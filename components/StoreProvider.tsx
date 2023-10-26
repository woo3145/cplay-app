'use client';

import { useEffect } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';
import {
  PLAYER_LOCAL_STORAGE,
  initPlayerLocalStorage,
  isValidPlayerLocalStorageState,
} from '@/store/playerLocalStorage';
import { Track } from '@/modules/track/domain/track';
import { useUserStore } from '@/store/useUserStore';

interface Props {
  children: React.ReactNode;
  likedTracks: Track[];
}

export function StoreProvider({ children, likedTracks }: Props) {
  const initPlayerStore = usePlayerStore((state) => state.initPlayerStore);
  const setLikedTracks = useUserStore((state) => state.setLikedTracks);

  useEffect(() => {
    setLikedTracks(likedTracks);
  }, [likedTracks, setLikedTracks]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof Storage === 'undefined') {
      console.error('Local storage is not supported in this browser.');
      return;
    }
    try {
      const item = JSON.parse(
        localStorage.getItem(PLAYER_LOCAL_STORAGE) || '{}'
      );
      if (!isValidPlayerLocalStorageState(item)) {
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
