import { Track } from '@/modules/track/domain/track';
import { create } from 'zustand';
import {
  PlayerLocalStorageState,
  updatePlayerLocalStorage,
} from './playerLocalStorage';
import { StemType } from '@/modules/stem/domain/stem';
import { useUIStatusStore } from './useUIStatusStorage';

export interface PlayerStoreState {
  // 실제 오디오 플레이어 객체에 반영되는 데이터
  currentTrack: Track | null;
  stemType: StemType | null;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;

  // 오디오가 속한 플레이리스트에 관한 데이터
  playlistName: string;
  playlist: Track[];
  playlistId: string;
  selectedBundleId: string; // 번들을 클릭하여 플레이리스트가 세팅 되었을때 갱신됨
}
interface PlayerStoreActions {
  initPlayerStore: (item: PlayerLocalStorageState) => void;
  setIsPlaying: (status: boolean) => void;
  setIsMuted: (status: boolean) => void;
  setTrack: (track: Track | null, stemType?: StemType) => void;
  setStemType: (StemType: StemType) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  setDuration: (duration: number) => void;

  setPlaylist: (
    id: string,
    name: string,
    tracks: Track[],
    selectedBundleId?: string
  ) => void;
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
    duration: 0,

    playlistName: '',
    playlist: [],
    playlistId: '',
    selectedBundleId: '',

    initPlayerStore: (item: PlayerLocalStorageState) => {
      set({
        currentTrack: item.currentTrack,
        stemType: item.stemType,
        isPlaying: false,
        isMuted: item.isMuted,
        volume: item.volume,
        currentTime: 0,
        playlist: item.playlist,
        playlistId: item.playlistId,
        playlistName: item.playlistName,
      });

      if (usePlayerStore.getState().playlistId !== '') {
        useUIStatusStore.getState().setIsPlyerOpen(true);
      }
    },

    setTrack: (track: Track | null, stemType: StemType = StemType.FULL) => {
      set({
        currentTrack: track,
        currentTime: 0,
        duration: track?.length ?? 0,
      });
      usePlayerStore.getState().setStemType(stemType);
      if (!usePlayerStore.getState().isPlaying) {
        usePlayerStore.getState().setIsPlaying(true);
      }
      updatePlayerLocalStorage({
        type: 'currentTrack',
        currentTrack: track,
      });
    },
    setStemType: (stemType: StemType) => {
      set({
        stemType: stemType,
      });
      updatePlayerLocalStorage({ type: 'stemType', stemType });
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
      updatePlayerLocalStorage({ type: 'isMuted', isMuted: status });
    },
    setCurrentTime: (time: number) => {
      set({ currentTime: time });
    },
    setVolume: (volume: number) => {
      set({ volume: volume });
      updatePlayerLocalStorage({ type: 'volume', volume });
    },
    setDuration: (duration) => {
      set({ duration: duration });
    },
    setPlaylist: (
      id: string,
      name: string,
      tracks: Track[],
      selectedBundleId: string = ''
    ) => {
      set({
        playlistName: name,
        playlistId: id.toString(),
        playlist: tracks,
        selectedBundleId,
      });
      updatePlayerLocalStorage({
        type: 'playlist',
        playlist: tracks,
        playlistName: name,
        playlistId: id.toString(),
        selectedBundleId,
      });

      if (id !== '') {
        useUIStatusStore.getState().setIsPlyerOpen(true);
      }
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
        if (currentTrackIdx === -1) currentTrackIdx = playlistLength - 1;
      }
      const nextTrack = playlist[currentTrackIdx];
      set({
        currentTime: 0,
        currentTrack: nextTrack,
      });

      updatePlayerLocalStorage({
        type: 'currentTrack',
        currentTrack: nextTrack,
      });
    },
  })
);
