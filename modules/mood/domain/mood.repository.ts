import { EditMoodFormData } from '@/modules/admin/domain/mood.validation';
import { Mood as DomainMood } from './mood';

export interface MoodRepository {
  getAll: () => Promise<DomainMood[]>;
  create: (tag: string) => Promise<DomainMood>;
  delete: (id: number) => Promise<void>;
  edit: (id: number, data: EditMoodFormData) => Promise<DomainMood>;
}
