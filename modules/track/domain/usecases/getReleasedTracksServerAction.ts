'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';
import { RepositoryGetTracksQuery } from '../validations/GetTrackTypes';
import { cacheKeys } from '@/modules/config/cacheHelper';

export const getReleasedTracksServerAction = async (
  query: RepositoryGetTracksQuery,
  subTrackRepository: TrackRepository | null = null
) => {
  const repo = subTrackRepository || repository.track;
  try {
    const tracks = await unstable_cache(
      async () => {
        const data = await repo.findAllWithQuery({
          genre: query.genre,
          page: query.page,
          take: query.take,
        });

        console.log(
          `Prisma 호출: ${cacheKeys.getReleasedTracksWithQuery(query)}`
        );
        return data;
      },
      [cacheKeys.getReleasedTracksWithQuery(query)],
      {
        tags: [
          cacheKeys.RELEASED_TRACKS,
          cacheKeys.getReleasedTracksWithQuery(query),
        ],
        revalidate: 3600,
      }
    )();
    const totalTracksCount = await unstable_cache(
      async () => {
        const data = await repo.countTracksWithQuery(query);

        console.log(`Prisma 호출: ${cacheKeys.getCountTracksWithQuery(query)}`);
        return data;
      },
      [cacheKeys.getCountTracksWithQuery(query)],
      {
        tags: [
          cacheKeys.RELEASED_TRACKS,
          cacheKeys.getCountTracksWithQuery(query),
        ],
        revalidate: 3600,
      }
    )();

    return { tracks, count: totalTracksCount };
  } catch (e) {
    console.error('getReleasedTracksServerAction Error: ', e);
    return { tracks: [], count: 0 };
  }
};
