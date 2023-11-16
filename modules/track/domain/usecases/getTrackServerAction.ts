'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { Track } from '../track';

export const getTrackServerAction = async (
  trackId: number,
  subTrackRepository: TrackRepository | null = null
): Promise<ServerActionResponse<Track>> => {
  try {
    const repo = subTrackRepository || repository.track;

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
      success: true,
      data: track,
    };
  } catch (e) {
    console.error(
      `getTrackServerAction: Error fetching track with ID ${trackId}`
    );
    return {
      success: false,
      error: getErrorMessage(e),
    };
  }
};
