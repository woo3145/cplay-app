import { create } from 'zustand';
import { usePlayerStore } from './usePlayerStore';

export interface PlayerStoreState {
  isPlayerOpen: boolean;
}
interface PlayerStoreActions {
  setIsPlyerOpen: (status: boolean) => void;
  closePlayer: () => void;
}

export const useUIStatusStore = create<PlayerStoreState & PlayerStoreActions>(
  (set) => ({
    isPlayerOpen: false,
    setIsPlyerOpen: (status) => {
      set({ isPlayerOpen: status });
    },

    closePlayer: () => {
      useUIStatusStore.getState().setIsPlyerOpen(false);
      usePlayerStore.getState().setPlaylist('', '', []);
      usePlayerStore.getState().setTrack(null);
    },
  })
);
