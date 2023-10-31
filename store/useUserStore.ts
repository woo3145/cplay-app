import { Bundle } from '@/modules/bundle/domain/bundle';
import { UserPlaylist } from '@/modules/playlist/domain/playlist';
import { Track } from '@/modules/track/domain/track';
import { create } from 'zustand';

export interface PlayerStoreState {
  likedTracks: Track[];
  likedBundles: Bundle[];
  playlists: UserPlaylist[];
}
interface PlayerStoreActions {
  setLikedTracks: (tracks: Track[]) => void;
  setLikedBundles: (bundles: Bundle[]) => void;
  setPlaylists: (playlists: UserPlaylist[]) => void;
}

export const useUserStore = create<PlayerStoreState & PlayerStoreActions>(
  (set) => ({
    likedTracks: [],
    likedBundles: [],
    playlists: [],
    setLikedTracks: (tracks) => {
      set({ likedTracks: tracks });
    },
    setLikedBundles: (bundle) => {
      set({ likedBundles: bundle });
    },
    setPlaylists: (playlists) => {
      set({ playlists });
    },
  })
);
