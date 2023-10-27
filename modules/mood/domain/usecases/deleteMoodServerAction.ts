'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { MoodRepository } from '@/modules/mood/domain/mood.repository';
import { revalidateTag } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';

export const deleteMoodServerAction = adminGuard(
  async (id: number, subMoodRepository: MoodRepository | null = null) => {
    const repo = subMoodRepository || repository.mood;

    try {
      await repo.delete(id);
      revalidateTag(cacheKeys.ALL_MOODS);
      revalidateTag(cacheKeys.RELEASED_TRACKS);
      revalidateTag(cacheKeys.ADMIN_ALL_TRACKS);

      return { success: true };
    } catch (e) {
      console.error('deleteMoodServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
