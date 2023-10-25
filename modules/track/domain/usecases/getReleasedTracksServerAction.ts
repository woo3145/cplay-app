'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';
import { RepositoryGetTracksQuery } from '../validations/GetTrackTypes';

export const getReleasedTracksServerAction = async (
  userId: string | null,
  query: Pick<RepositoryGetTracksQuery, 'genre'>,
  subTrackRepository: TrackRepository | null = null
) => {
  const repo = subTrackRepository || repository.track;

  try {
    const tracksPromise = unstable_cache(
      async () => {
        const data = await repo.findAllWithQuery({
          genre: query.genre === 'all' ? undefined : query.genre,
          page: 1,
          count: 12,
        });

        console.log(`Prisma 호출 : releasedTracks-${query.genre}`);
        return data;
      },
      [`releasedTracks-${query.genre}`, 'releasedTracks', 'allTracks'],
      {
        tags: [`releasedTracks-${query.genre}`, 'releasedTracks', 'allTracks'],
        revalidate: 3600,
      }
    )();

    let likedTracksPromise;

    if (userId) {
      likedTracksPromise = unstable_cache(
        () => repo.getLikedTracksByUser(userId),
        [`likedTracks-${userId}`],
        {
          tags: [`likedTracks-${userId}`],
          revalidate: 3600,
        }
      )();
    } else {
      likedTracksPromise = Promise.resolve([]);
    }
    const [tracks, likedTracks] = await Promise.all([
      tracksPromise,
      likedTracksPromise,
    ]);
    const likedTrackIds = likedTracks.map((track) => track.id);

    // 각 트랙에 대해 '좋아요' 상태 설정
    for (const track of tracks) {
      // userId가 null인 경우 모든 트랙의 '좋아요' 상태를 false로 설정
      track.likedByUser = userId ? likedTrackIds.includes(track.id) : false;
    }

    return tracks;
  } catch (e) {
    console.error('getReleasedTracksServerAction Error: ', e);
    return [];
  }
};
