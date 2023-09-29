'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import {
  DeleteMoodFormData,
  DeleteMoodFormSchema,
} from '../../domain/mood.validation';
import { MoodRepository } from '@/modules/mood/domain/mood.repository';

export const deleteMoodServerAction = adminGuard(
  async (
    data: DeleteMoodFormData,
    subMoodRepository: MoodRepository | null = null
  ) => {
    const { id } = DeleteMoodFormSchema.parse(data);
    const repo = subMoodRepository || repository.mood;

    try {
      await repo.delete(id);
      return { success: true };
    } catch (e) {
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
