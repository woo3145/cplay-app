'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';
import { RepositoryGetTracksQuery } from '../validations/GetTrackTypes';

export const getReleasedTracksServerAction = async (
  query: Pick<RepositoryGetTracksQuery, 'genre'>,
  subTrackRepository: TrackRepository | null = null
) => {
  const repo = subTrackRepository || repository.track;

  try {
    const tracks = unstable_cache(
      async () => {
        const data = await repo.findAllWithQuery({
          genre: query.genre === 'all' ? undefined : query.genre,
          page: 1,
          count: 12,
        });

        console.log(`Prisma 호출 : releasedTracks-${query.genre}`);
        return data;
      },
      [`releasedTracks-${query.genre}`, 'releasedTracks'],
      {
        tags: [`releasedTracks-${query.genre}`, 'releasedTracks'],
        revalidate: 3600,
      }
    )();

    return tracks;
  } catch (e) {
    console.error('getReleasedTracksServerAction Error: ', e);
    return [];
  }
};
