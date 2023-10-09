'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import {
  UsecaseCreateTrackInput,
  UsecaseCreateTrackInputSchema,
} from '../validations/CreateTrackTypes';
import { TrackRepository } from '../track.repository';
import { TrackStatus } from '../track';

export const createTrackServerAction = adminGuard(
  async (
    data: UsecaseCreateTrackInput,
    subTrackRepository: TrackRepository | null = null
  ) => {
    const parsedData = UsecaseCreateTrackInputSchema.parse(data);
    const repo = subTrackRepository || repository.track;

    try {
      const track = await repo.create(parsedData);
      revalidateTag('allTracks');
      if (track.status === TrackStatus.PUBLISH) {
        revalidateTag(`releasedTracks-all`);
        track.genres.forEach((genre) => {
          revalidateTag(`releasedTracks-${genre.slug}`);
        });
      }

      return { success: true, track };
    } catch (e) {
      console.error('createTrackServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
