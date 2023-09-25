'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '../adminGuard';
import { MoodRepository } from '@/modules/mood/domain/mood.repository';
import {
  CreateMoodFormData,
  CreateMoodFormSchema,
} from '../domain/mood.validation';

export const createMood = adminGuard(
  async (
    data: CreateMoodFormData,
    subMoodRepository: MoodRepository | null = null
  ) => {
    const { tag } = CreateMoodFormSchema.parse(data);
    const repo = subMoodRepository || repository.mood;
    const mood = await repo.createMood(tag);

    return mood;
  }
);
