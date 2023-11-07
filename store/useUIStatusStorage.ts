import { create } from 'zustand';
import { usePlayerStore } from './usePlayerStore';

export interface UIStatusStoreState {
  isPlayerOpen: boolean; // 오디오 플레이어의 상태 (on, off)
  playerCurrentTime: number; // 오디오 플레이어의 SlideBar 상태
}
interface UIStatusStoreActions {
  setIsPlyerOpen: (status: boolean) => void;
  closePlayer: () => void;
  setPlayerCurrentTime: (time: number) => void;
}

export const useUIStatusStore = create<
  UIStatusStoreState & UIStatusStoreActions
>((set) => ({
  isPlayerOpen: false,
  playerCurrentTime: 0,
  setIsPlyerOpen: (status) => {
    set({ isPlayerOpen: status });
  },

  setPlayerCurrentTime: (time) => {
    set({ playerCurrentTime: time });
  },

  closePlayer: () => {
    useUIStatusStore.getState().setIsPlyerOpen(false);
    usePlayerStore.getState().setPlaylist('', '', []);
    usePlayerStore.getState().setTrack(null, null);
  },
}));
