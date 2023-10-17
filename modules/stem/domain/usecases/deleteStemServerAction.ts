'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import { StemRepository } from '../stem.repository';

export const deleteStemServerAction = adminGuard(
  async (id: number, subStemRepository: StemRepository | null = null) => {
    const repo = subStemRepository || repository.stem;
    try {
      const trackId = await repo.delete(id);

      if (trackId) {
        revalidateTag(`track-${trackId}`);
        revalidateTag(`releasedTracks`);
      }

      return { success: true };
    } catch (e) {
      console.error('deleteMoodServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
