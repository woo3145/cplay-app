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
import { Bundle } from '@/modules/bundle/domain/bundle';
import { UserPlaylist } from '@/modules/playlist/domain/playlist';

interface Props {
  children: React.ReactNode;
  likedTracks: Track[];
  likedBundles: Bundle[];
  playlists: UserPlaylist[];
}

export function StoreProvider({
  children,
  likedTracks,
  likedBundles,
  playlists,
}: Props) {
  const initPlayerStore = usePlayerStore((state) => state.initPlayerStore);
  const [setLikedTracks, setLikedBundles, setPlaylists] = useUserStore(
    (state) => [state.setLikedTracks, state.setLikedBundles, state.setPlaylists]
  );

  useEffect(() => {
    setLikedTracks(likedTracks);
    setLikedBundles(likedBundles);
    setPlaylists(playlists);
  }, [
    likedTracks,
    setLikedTracks,
    likedBundles,
    setLikedBundles,
    playlists,
    setPlaylists,
  ]);

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
