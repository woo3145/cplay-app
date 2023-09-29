'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { MoodRepository } from '@/modules/mood/domain/mood.repository';
import {
  CreateMoodFormData,
  CreateMoodFormSchema,
} from '../../domain/mood.validation';

export const createMoodServerAction = adminGuard(
  async (
    data: CreateMoodFormData,
    subMoodRepository: MoodRepository | null = null
  ) => {
    const { tag } = CreateMoodFormSchema.parse(data);
    const repo = subMoodRepository || repository.mood;

    try {
      const mood = await repo.createMood(tag);
      return { success: true, mood };
    } catch (e) {
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
