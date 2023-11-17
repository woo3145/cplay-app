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
import { ValidationError } from '@/lib/errors';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { Stem } from '../stem';

export const createStemServerAction = adminGuard(
  async (
    data: UsecaseCreateStemInput,
    subStemRepository: StemRepository | null = null,
    subTrackRepository: TrackRepository | null = null
  ): Promise<ServerActionResponse<Stem>> => {
    try {
      const parsedResult = UsecaseCreateStemInputSchema.safeParse(data);
      const repo = subStemRepository || repository.stem;
      const trackRepo = subTrackRepository || repository.track;

      if (!parsedResult.success) {
        throw new ValidationError();
      }

      const { trackId, src, stemType } = parsedResult.data;

      const track = await trackRepo.findById(trackId);
      const stem = await repo.create({ trackId, src, stemType });

      revalidateTag(cacheKeys.getTrack(trackId));

      if (track.status === TrackStatus.PUBLISH) {
        revalidateTag(cacheKeys.RELEASED_TRACKS);
      }

      return { success: true, data: stem };
    } catch (e) {
      console.error('createStemServerAction Error');
      return { success: false, error: '서버에 문제가 발생하였습니다.' };
    }
  }
);
