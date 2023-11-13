import { Genre } from '@/modules/genre/domain/genre';
import { Mood } from '@/modules/mood/domain/mood';
import { create } from 'zustand';

export interface AppStoreState {
  genres: Genre[];
  moods: Mood[];
}
interface AppStoreActions {
  setGenres: (genres: Genre[]) => void;
  setMoods: (moods: Mood[]) => void;
}

export const useAppStore = create<AppStoreState & AppStoreActions>((set) => ({
  genres: [],
  moods: [],
  setGenres: (genres) => {
    set({ genres: genres });
  },
  setMoods: (moods) => {
    set({ moods: moods });
  },
}));
