'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { TrackRepository } from '@/modules/track/domain/track.repository';
import { revalidateTag } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { TrackStatus } from '../track';

export const deleteTrackServerAction = adminGuard(
  async (id: number, subTrackRepository: TrackRepository | null = null) => {
    const repo = subTrackRepository || repository.track;

    try {
      const exist = await repo.delete(id);

      revalidateTag(cacheKeys.ADMIN_ALL_TRACKS);

      if (exist.status === TrackStatus.PUBLISH) {
        revalidateTag(cacheKeys.RELEASED_TRACKS);
      }

      return { success: true };
    } catch (e) {
      console.error('deleteTrackServerAction Error: ', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
