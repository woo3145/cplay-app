import { Mood } from '@prisma/client';
import { Mood as DomainMood } from '../domain/mood';

export const toMoodDomainModel = (record: Mood): DomainMood => {
  return {
    id: record.id,
    tag: record.tag,
  };
};
