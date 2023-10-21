'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';

// 페이지 네이션 필요
export const getTrackServerAction = async (
  id: number,
  subTrackRepository: TrackRepository | null = null
) => {
  const repo = subTrackRepository || repository.track;

  try {
    const track = unstable_cache(
      async () => {
        const data = await repo.findById(id);
        console.log(`Prisma 호출 : track-${id}`);
        return data;
      },
      [`track-${id}`, 'allTracks'],
      { tags: [`track-${id}`, 'allTracks'], revalidate: 3600 }
    )();
    return track;
  } catch (e) {
    console.error('getTrackServerAction Error: ', e);
    return null;
  }
};
