'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';
import { RepositoryGetTracksQuery } from '../validations/GetTrackTypes';
import { cacheKeys, cacheTags } from '@/modules/config/cacheHelper';

export const getReleasedTracksServerAction = async (
  query: Pick<RepositoryGetTracksQuery, 'genre'>,
  subTrackRepository: TrackRepository | null = null
) => {
  const repo = subTrackRepository || repository.track;

  try {
    const tracks = await unstable_cache(
      async () => {
        const data = await repo.findAllWithQuery({
          genre: query.genre === 'all' ? undefined : query.genre,
          page: 1,
          count: 12,
        });

        console.log(
          `Prisma 호출: ${cacheKeys.getReleasedTracksByGenre(
            query.genre ?? ''
          )}`
        );
        return data;
      },
      [cacheKeys.getReleasedTracksByGenre(query.genre ?? '')],
      {
        tags: [cacheTags.RELEASED_TRACK],
        revalidate: 3600,
      }
    )();

    return tracks;
  } catch (e) {
    console.error('getReleasedTracksServerAction Error: ', e);
    return [];
  }
};
