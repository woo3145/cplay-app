'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';

// 페이지 네이션 필요
export const getAllTracksServerAction = async (
  subTrackRepository: TrackRepository | null = null
) => {
  const repo = subTrackRepository || repository.track;

  try {
    const allTracks = await unstable_cache(
      async () => {
        const data = await repo.findAll();
        console.log(`Prisma 호출: ${cacheKeys.ADMIN_ALL_TRACKS}`);
        return data;
      },
      [cacheKeys.ADMIN_ALL_TRACKS],
      { tags: [cacheKeys.ADMIN_ALL_TRACKS], revalidate: 3600 }
    )();
    return allTracks;
  } catch (e) {
    console.error('getAllTracksServerAction Error: ', e);
    return [];
  }
};
