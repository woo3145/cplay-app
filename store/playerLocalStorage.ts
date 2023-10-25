import { StemType } from '@/modules/stem/domain/stem';
import { Track } from '@/modules/track/domain/track';

export interface PlayerLocalStorageState {
  currentTrack: Track | null;
  stemType: StemType | null;
  isMuted: boolean;
  volume: number;
  playlist: Track[];
  playlistId: number | null;
}

type PlayerLocalStoragePayload =
  | { type: 'currentTrack'; currentTrack: Track | null; currentTime: number }
  | { type: 'stemType'; stemType: StemType | null }
  | { type: 'isMuted'; isMuted: boolean }
  | { type: 'volume'; volume: number }
  | { type: 'playlist'; playlist: Track[]; playlistId: number | null };

export const PLAYER_LOCAL_STORAGE = 'JAZZIT_PLAYER_STATE';

export const isValidPlayerStoreState = (
  item: any
): item is PlayerLocalStorageState => {
  return (
    'currentTrack' in item &&
    'stemType' in item &&
    'isMuted' in item &&
    'volume' in item &&
    'playlist' in item &&
    'playlistId' in item
  );
};

export const initPlayerLocalStorage = () => {
  if (typeof window === 'undefined' || typeof Storage === 'undefined') {
    console.error('Local storage is not supported in this browser.');
    return;
  }
  localStorage.setItem(
    PLAYER_LOCAL_STORAGE,
    JSON.stringify({
      currentTrack: null,
      stemType: null,
      isMuted: false,
      volume: 1,
      playlist: [],
      playlistId: null,
    })
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
    try {
      const parsed = JSON.parse(
        localStorage.getItem(PLAYER_LOCAL_STORAGE) || '{}'
      );
      if (!isValidPlayerStoreState(parsed)) {
        throw new Error('Invalid player state in local storage');
      }
      item = parsed;
    } catch {
      console.error(
        'Failed to parse player state from local storage. Setting to initial state.'
      );
      item = {
        currentTrack: null,
        stemType: null,
        isMuted: false,
        volume: 1,
        playlist: [],
        playlistId: null,
      };
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
      case 'playlist':
        item.playlist = payload.playlist;
        item.playlistId = payload.playlistId;
        break;
    }
    localStorage.setItem(PLAYER_LOCAL_STORAGE, JSON.stringify(item));
  } catch (e) {
    console.log(e);
  }
};
