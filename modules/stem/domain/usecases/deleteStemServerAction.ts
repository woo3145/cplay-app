'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import { StemRepository } from '../stem.repository';
import { TrackRepository } from '@/modules/track/domain/track.repository';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { TrackStatus } from '@/modules/track/domain/track';

export const deleteStemServerAction = adminGuard(
  async (
    id: number,
    subStemRepository: StemRepository | null = null,
    subTrackRepository: TrackRepository | null = null
  ) => {
    const repo = subStemRepository || repository.stem;
    const trackRepo = subTrackRepository || repository.track;
    try {
      const exist = await repo.delete(id);
      const track = await trackRepo.findById(exist.id);

      if (track) {
        revalidateTag(cacheKeys.getTrack(track.id));

        if (track.status === TrackStatus.PUBLISH) {
          revalidateTag(cacheKeys.RELEASED_TRACKS);
        }
      }

      return { success: true };
    } catch (e) {
      console.error('deleteMoodServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
