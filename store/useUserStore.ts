import { Track } from '@/modules/track/domain/track';
import { create } from 'zustand';

export interface PlayerStoreState {
  likedTracks: Track[];
}
interface PlayerStoreActions {
  setLikedTracks: (tracks: Track[]) => void;
}

export const useUserStore = create<PlayerStoreState & PlayerStoreActions>(
  (set) => ({
    likedTracks: [],
    setLikedTracks: (tracks) => {
      set({ likedTracks: tracks });
    },
  })
);
