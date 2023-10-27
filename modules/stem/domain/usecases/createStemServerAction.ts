'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { StemRepository } from '../stem.repository';
import {
  UsecaseCreateStemInput,
  UsecaseCreateStemInputSchema,
} from '../validations/CreateStemTypes';
import { revalidateTag } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { TrackRepository } from '@/modules/track/domain/track.repository';
import { TrackStatus } from '@/modules/track/domain/track';

export const createStemServerAction = adminGuard(
  async (
    data: UsecaseCreateStemInput,
    subStemRepository: StemRepository | null = null,
    subTrackRepository: TrackRepository | null = null
  ) => {
    const { trackId, src, stemType } = UsecaseCreateStemInputSchema.parse(data);
    const repo = subStemRepository || repository.stem;
    const trackRepo = subTrackRepository || repository.track;

    try {
      const track = await trackRepo.findById(trackId);
      if (!track) {
        return { success: false, message: '트랙이 존재하지 않습니다.' };
      }
      const stem = await repo.create({ trackId, src, stemType });

      revalidateTag(cacheKeys.getTrack(trackId));

      if (track.status === TrackStatus.PUBLISH) {
        revalidateTag(cacheKeys.getReleasedTracksByGenre('all'));
        track.genres.forEach((genre) => {
          revalidateTag(cacheKeys.getReleasedTracksByGenre(genre.slug));
        });
      }

      return { success: true, stem };
    } catch (e) {
      console.error('createStemServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
