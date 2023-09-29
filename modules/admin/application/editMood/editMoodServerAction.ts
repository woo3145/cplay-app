'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import {
  EditMoodFormData,
  EditMoodFormSchema,
} from '../../domain/mood.validation';
import { MoodRepository } from '@/modules/mood/domain/mood.repository';

export const editMoodServerAction = adminGuard(
  async (
    id: number,
    data: EditMoodFormData,
    subMoodRepository: MoodRepository | null = null
  ) => {
    const { tag } = EditMoodFormSchema.parse(data);
    const repo = subMoodRepository || repository.mood;

    try {
      const result = await repo.edit(id, { tag });
      return { success: true, mood: result };
    } catch (e) {
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
