'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';
import { cacheKeys, cacheTags } from '@/modules/config/cacheHelper';

// 페이지 네이션 필요
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
        tags: [cacheTags.getTrack(trackId), cacheTags.ADMIN_ALL_TRACKS],
        revalidate: 3600,
      }
    )();

    return track;
  } catch (e) {
    console.error('getTrackServerAction Error: ', e);
    return null;
  }
};
