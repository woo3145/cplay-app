import { StemType } from '@/modules/stem/domain/stem';
import { Track } from '@/modules/track/domain/track';
import { PlayerStoreState } from './usePlayerStore';

export type PlayerLocalStorageState = Omit<
  PlayerStoreState,
  'isPlaying' | 'currentTime'
>;

type PlayerLocalStoragePayload =
  | { type: 'currentTrack'; currentTrack: Track | null }
  | { type: 'stemType'; stemType: StemType | null }
  | { type: 'isMuted'; isMuted: boolean }
  | { type: 'volume'; volume: number }
  | { type: 'duration'; duration: number }
  | {
      type: 'playlist';
      playlist: Track[];
      playlistName: string;
      playlistId: string;
      selectedBundleId: string;
    };

export const PLAYER_LOCAL_STORAGE = 'JAZZIT_PLAYER_STATE';

export const isValidPlayerLocalStorageState = (
  item: any
): item is PlayerLocalStorageState => {
  return (
    'currentTrack' in item &&
    'stemType' in item &&
    'isMuted' in item &&
    'volume' in item &&
    'duration' in item &&
    'playlist' in item &&
    'playlistId' in item
  );
};

const DEFAULT_PLAYER_STATE = {
  currentTrack: null,
  stemType: null,
  isMuted: false,
  volume: 1,
  duration: 0,
  playlistName: '',
  playlist: [],
  playlistId: '',
  selectedBundleId: '',
};

export const initPlayerLocalStorage = () => {
  if (typeof window === 'undefined' || typeof Storage === 'undefined') {
    console.error('Local storage is not supported in this browser.');
    return;
  }
  localStorage.setItem(
    PLAYER_LOCAL_STORAGE,
    JSON.stringify(DEFAULT_PLAYER_STATE)
  );
};

export const updatePlayerLocalStorage = (
  payload: PlayerLocalStoragePayload
) => {
  if (typeof window === 'undefined' || typeof Storage === 'undefined') {
    console.error('Local storage is not supported in this browser.');
    return;
  }
  try {
    let item: PlayerLocalStorageState;
    // localStorage 값이 PlayerLocalStorageState와 다르면 default 값으로 초기화
    try {
      const parsed = JSON.parse(
        localStorage.getItem(PLAYER_LOCAL_STORAGE) || '{}'
      );
      if (!isValidPlayerLocalStorageState(parsed)) {
        throw new Error('Invalid player state in local storage');
      }
      item = parsed;
    } catch {
      console.error(
        'Failed to parse player state from local storage. Setting to initial state.'
      );
      localStorage.removeItem(PLAYER_LOCAL_STORAGE);
      item = DEFAULT_PLAYER_STATE;
    }
    switch (payload.type) {
      case 'currentTrack':
        item.currentTrack = payload.currentTrack;
        break;
      case 'stemType':
        item.stemType = payload.stemType;
        break;
      case 'isMuted':
        item.isMuted = payload.isMuted;
        break;
      case 'volume':
        item.volume = payload.volume;
        break;
      case 'duration':
        item.duration = payload.duration;
        break;
      case 'playlist':
        item.playlistName = payload.playlistName;
        item.playlist = payload.playlist;
        item.playlistId = payload.playlistId;
        item.selectedBundleId = payload.selectedBundleId;
        break;
    }
    localStorage.setItem(PLAYER_LOCAL_STORAGE, JSON.stringify(item));
  } catch (e) {
    console.log(e);
  }
};
