'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { TrackRepository } from '@/modules/track/domain/track.repository';
import { revalidateTag } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { TrackStatus } from '../track';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { ValidationError } from '@/lib/errors';
import { z } from 'zod';
import { ServerActionResponse } from '@/types/ServerActionResponse';

export const deleteTrackServerAction = adminGuard(
  async (
    id: number,
    subTrackRepository: TrackRepository | null = null
  ): Promise<ServerActionResponse<void>> => {
    try {
      const parsedResult = z.number().safeParse(id);
      const repo = subTrackRepository || repository.track;

      if (!parsedResult.success) {
        throw new ValidationError();
      }

      const exist = await repo.delete(parsedResult.data);

      revalidateTag(cacheKeys.ADMIN_ALL_TRACKS);

      if (exist.status === TrackStatus.PUBLISH) {
        revalidateTag(cacheKeys.RELEASED_TRACKS);
      }
      return { success: true, data: undefined };
    } catch (e) {
      console.error(`deleteTrackServerAction Error with ID ${id}`);
      return { success: false, error: getErrorMessage(e) };
    }
  }
);
