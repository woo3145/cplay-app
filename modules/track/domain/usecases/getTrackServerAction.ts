'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';

// 페이지 네이션 필요
export const getTrackServerAction = async (
  userId: string | null,
  trackId: number,
  subTrackRepository: TrackRepository | null = null
) => {
  const repo = subTrackRepository || repository.track;

  try {
    const trackPromise = unstable_cache(
      () => {
        const data = repo.findById(trackId);
        console.log(`Prisma 호출 : track-${trackId}`);
        return data;
      },
      [`track-${trackId}`, 'allTracks'],
      { tags: [`track-${trackId}`, 'allTracks'], revalidate: 3600 }
    )();

    let likedTracksPromise;
    if (userId) {
      likedTracksPromise = unstable_cache(
        () => {
          const data = repo.getLikedTracksByUser(userId);
          console.log(`Prisma 호출 : likedTracks-${userId}`);
          return data;
        },
        [`likedTracks-${userId}`],
        {
          tags: [`likedTracks-${userId}`],
          revalidate: 3600,
        }
      )();
    } else {
      likedTracksPromise = Promise.resolve([]);
    }
    const [track, likedTracks] = await Promise.all([
      trackPromise,
      likedTracksPromise,
    ]);
    const likedTrackIds = likedTracks.map((track) => track.id);

    if (!track) return null;

    track.likedByUser = userId ? likedTrackIds.includes(track.id) : false;

    return track;
  } catch (e) {
    console.error('getTrackServerAction Error: ', e);
    return null;
  }
};
