import { Track } from '@/modules/track/domain/track';
import { StemType } from '@prisma/client';
import { create } from 'zustand';

interface PlayerStoreState {
  currentTrack: Track | null;
  stemType: StemType | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;

  setIsPlaying: (status: boolean) => void;
  setTrack: (track: Track, stemType?: StemType) => void;
  setStemType: (StemType: StemType) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerStoreState>((set) => ({
  currentTrack: null,
  stemType: null,
  isPlaying: false,
  volume: 1,
  currentTime: 0,
  setTrack: (track: Track, stemType: StemType = StemType.FULL) => {
    set({
      currentTrack: track,
      currentTime: 0,
    });
    usePlayerStore.getState().setStemType(stemType);
    if (!usePlayerStore.getState().isPlaying) {
      usePlayerStore.getState().setIsPlaying(true);
    }
  },
  setStemType: (stemType: StemType) => {
    set({
      stemType: stemType,
    });
  },
  setIsPlaying: (status: boolean) => {
    set({
      isPlaying: status,
    });
  },
  setCurrentTime: (time: number) => {
    set({ currentTime: time });
  },
  setVolume: (volume: number) => {
    set({ volume: volume });
  },
}));
