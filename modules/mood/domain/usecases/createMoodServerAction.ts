'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { MoodRepository } from '@/modules/mood/domain/mood.repository';
import {
  UsecaseCreateMoodInput,
  UsecaseCreateMoodInputSchema,
} from '../validations/CreateMoodTypes';
import { revalidateTag } from 'next/cache';

export const createMoodServerAction = adminGuard(
  async (
    data: UsecaseCreateMoodInput,
    subMoodRepository: MoodRepository | null = null
  ) => {
    const { tag } = UsecaseCreateMoodInputSchema.parse(data);
    const repo = subMoodRepository || repository.mood;

    try {
      const mood = await repo.create({ tag });
      revalidateTag('allMoods');

      return { success: true, mood };
    } catch (e) {
      console.error('createMoodServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
