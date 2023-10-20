import { Mood as DomainMood } from './mood';
import { RepositoryCreateMoodInput } from './validations/CreateMoodTypes';
import { RepositoryEditMoodInput } from './validations/EditMoodTypes';

export interface MoodRepository {
  findOne: (id: number) => Promise<DomainMood | null>;
  getAll: () => Promise<DomainMood[]>;
  create: (data: RepositoryCreateMoodInput) => Promise<DomainMood>;
  delete: (id: number) => Promise<void>;
  edit: (
    id: number,
    updatedField: RepositoryEditMoodInput
  ) => Promise<DomainMood>;
}
