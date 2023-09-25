import { Mood as DomainMood } from './mood';

export interface MoodRepository {
  getAllMoods: () => Promise<DomainMood[]>;
  createMood: (tag: string) => Promise<DomainMood>;
}
