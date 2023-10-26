import { Bundle } from '@/modules/bundle/domain/bundle';
import { Track } from '@/modules/track/domain/track';
import { create } from 'zustand';

export interface PlayerStoreState {
  likedTracks: Track[];
  likedBundles: Bundle[];
}
interface PlayerStoreActions {
  setLikedTracks: (tracks: Track[]) => void;
  setLikedBundles: (bundles: Bundle[]) => void;
}

export const useUserStore = create<PlayerStoreState & PlayerStoreActions>(
  (set) => ({
    likedTracks: [],
    likedBundles: [],
    setLikedTracks: (tracks) => {
      set({ likedTracks: tracks });
    },
    setLikedBundles: (bundle) => {
      set({ likedBundles: bundle });
    },
  })
);
