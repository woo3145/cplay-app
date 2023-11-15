'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { NotFoundError } from '@/lib/errors';

export const getTrackServerAction = async (
  trackId: number,
  subTrackRepository: TrackRepository | null = null
) => {
  const repo = subTrackRepository || repository.track;

  try {
    const track = await unstable_cache(
      async () => {
        const data = await repo.findById(trackId);
        console.log(`Prisma 호출: ${cacheKeys.getTrack(trackId)}`);
        return data;
      },
      [cacheKeys.getTrack(trackId)],
      {
        tags: [cacheKeys.getTrack(trackId)],
        revalidate: 3600,
      }
    )();

    return {
      data: track,
    };
  } catch (e) {
    if (e instanceof NotFoundError) {
      return {
        data: null,
      };
    }
    console.error(
      `getTrackServerAction: Error fetching track with ID ${trackId}`
    );
    return {
      error: getErrorMessage(e),
    };
  }
};
