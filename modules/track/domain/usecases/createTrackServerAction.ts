'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import {
  UsecaseCreateTrackInput,
  UsecaseCreateTrackInputSchema,
} from '../validations/CreateTrackTypes';
import { TrackRepository } from '../track.repository';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { ValidationError } from '@/lib/errors';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { Track } from '../track';

export const createTrackServerAction = adminGuard(
  async (
    data: UsecaseCreateTrackInput,
    subTrackRepository: TrackRepository | null = null
  ): Promise<ServerActionResponse<Track>> => {
    try {
      const parsedResult = UsecaseCreateTrackInputSchema.safeParse(data);
      const repo = subTrackRepository || repository.track;

      if (!parsedResult.success) {
        throw new ValidationError();
      }
      const track = await repo.create(parsedResult.data);

      revalidateTag(cacheKeys.ADMIN_ALL_TRACKS);

      return { success: true, data: track };
    } catch (e) {
      console.error('createTrackServerAction Error');
      return { success: false, error: getErrorMessage(e) };
    }
  }
);
