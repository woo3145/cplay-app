'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import {
  DeleteMoodFormData,
  DeleteMoodFormSchema,
} from '../../../admin/domain/mood.validation';
import { MoodRepository } from '@/modules/mood/domain/mood.repository';
import { revalidateTag } from 'next/cache';

export const deleteMoodServerAction = adminGuard(
  async (
    data: DeleteMoodFormData,
    subMoodRepository: MoodRepository | null = null
  ) => {
    const { id } = DeleteMoodFormSchema.parse(data);
    const repo = subMoodRepository || repository.mood;

    try {
      await repo.delete(id);
      revalidateTag('allMoods');

      return { success: true };
    } catch (e) {
      console.error('deleteMoodServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
