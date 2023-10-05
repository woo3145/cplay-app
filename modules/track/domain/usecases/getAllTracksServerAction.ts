'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';

// 페이지 네이션 필요
export const getAllTracksServerAction = async (
  subTrackRepository: TrackRepository | null = null
) => {
  const repo = subTrackRepository || repository.track;

  try {
    const tracks = unstable_cache(
      async () => {
        const data = await repo.findAll();
        console.log(`Prisma 호출 : allTracks`);
        return data;
      },
      [`allTracks`],
      { tags: [`allTracks`], revalidate: 3600 }
    )();
    return tracks;
  } catch (e) {
    console.error('getAllTracksServerAction Error: ', e);
    return [];
  }
};
