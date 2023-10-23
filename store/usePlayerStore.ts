import { Track } from '@/modules/track/domain/track';
import { StemType } from '@prisma/client';
import { create } from 'zustand';

interface PlayerStoreState {
  currentTrack: Track | null;
  stemType: StemType | null;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;

  playlist: Track[];
  playlistId: number | null;
}
interface PlayerStoreActions {
  setIsPlaying: (status: boolean) => void;
  setIsMuted: (status: boolean) => void;
  setTrack: (track: Track | null, stemType?: StemType) => void;
  setStemType: (StemType: StemType) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;

  setPlaylist: (id: number, tracks: Track[]) => void;
  changeMusic: (type: 'next' | 'prev') => void;
}

export const usePlayerStore = create<PlayerStoreState & PlayerStoreActions>(
  (set) => ({
    currentTrack: null,
    stemType: null,
    isPlaying: false,
    isMuted: false,
    volume: 1,
    currentTime: 0,

    playlist: [],
    playlistId: null,

    setTrack: (track: Track | null, stemType: StemType = StemType.FULL) => {
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
    setIsMuted: (status: boolean) => {
      set({
        isMuted: status,
      });
    },
    setCurrentTime: (time: number) => {
      set({ currentTime: time });
    },
    setVolume: (volume: number) => {
      set({ volume: volume });
    },

    setPlaylist: (id: number, tracks: Track[]) => {
      set({
        playlistId: id,
        playlist: tracks,
      });
    },

    changeMusic: (type: 'next' | 'prev') => {
      const currentTrack = usePlayerStore.getState().currentTrack;
      const playlist = usePlayerStore.getState().playlist;

      if (!currentTrack || playlist.length === 0) {
        set({
          isPlaying: false,
          currentTime: 0,
        });
        return;
      }

      const playlistLength = playlist.length;
      let currentTrackIdx = playlist.findIndex(
        (track) => track.id === currentTrack.id
      );

      if (type === 'next') {
        ++currentTrackIdx;
        if (playlistLength === currentTrackIdx) currentTrackIdx = 0;
      } else {
        --currentTrackIdx;
        if (playlistLength === -1) currentTrackIdx = playlistLength - 1;
      }
      const nextTrack = playlist[currentTrackIdx];

      set({
        currentTime: 0,
        currentTrack: nextTrack,
      });
    },
  })
);
