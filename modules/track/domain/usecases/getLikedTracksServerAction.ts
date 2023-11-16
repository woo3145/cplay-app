'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { Track } from '../track';
import { AuthorizationError } from '@/lib/errors';
import { getErrorMessage } from '@/lib/getErrorMessage';

export const getLikedTracksServerAction = async (
  userId?: string,
  subTrackRepository: TrackRepository | null = null
): Promise<ServerActionResponse<Track[]>> => {
  try {
    const repo = subTrackRepository || repository.track;

    if (!userId) {
      throw new AuthorizationError();
    }

    const likedTracks = await unstable_cache(
      async () => {
        const data = await repo.getLikedTracksByUser(userId);
        console.log(`Prisma 호출: ${cacheKeys.getLikedTracksByUser(userId)}`);
        return data;
      },
      [cacheKeys.getLikedTracksByUser(userId)],
      {
        tags: [cacheKeys.getLikedTracksByUser(userId)],
        revalidate: 3600,
      }
    )();

    return {
      success: true,
      data: likedTracks,
    };
  } catch (e) {
    console.error('getTrackServerAction Error');
    return { success: false, error: getErrorMessage(e) };
  }
};
