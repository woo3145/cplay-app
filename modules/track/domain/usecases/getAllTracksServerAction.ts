'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { Track } from '../track';
import { getErrorMessage } from '@/lib/getErrorMessage';

// 페이지 네이션 필요
export const getAllTracksServerAction = async (
  subTrackRepository: TrackRepository | null = null
): Promise<ServerActionResponse<Track[]>> => {
  const repo = subTrackRepository || repository.track;

  try {
    const { tracks, totalCount } = await unstable_cache(
      async () => {
        const data = await repo.findAll({}, true);
        console.log(`Prisma 호출: ${cacheKeys.ADMIN_ALL_TRACKS}`);
        return data;
      },
      [cacheKeys.ADMIN_ALL_TRACKS],
      { tags: [cacheKeys.ADMIN_ALL_TRACKS], revalidate: 3600 }
    )();
    return {
      success: true,
      data: tracks,
    };
  } catch (e) {
    console.error('getAllTracksServerAction Error');
    return { success: false, error: getErrorMessage(e) };
  }
};
