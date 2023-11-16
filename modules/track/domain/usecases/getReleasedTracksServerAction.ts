'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { unstable_cache } from 'next/cache';
import { RepositoryGetTracksQuery } from '../validations/GetTrackTypes';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { Track } from '../track';
import { getErrorMessage } from '@/lib/getErrorMessage';

export const getReleasedTracksServerAction = async (
  query: RepositoryGetTracksQuery,
  subTrackRepository: TrackRepository | null = null
): Promise<ServerActionResponse<{ tracks: Track[]; count: number }>> => {
  const repo = subTrackRepository || repository.track;
  try {
    query.genres?.sort((a, b) => a - b);
    query.moods?.sort((a, b) => a - b);

    const { tracks, totalCount } = await unstable_cache(
      async () => {
        const data = await repo.findAll({
          title: query.title,
          genres: query.genres,
          moods: query.moods,
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

    return { success: true, data: { tracks, count: totalCount } };
  } catch (e) {
    console.error('getReleasedTracksServerAction Error');
    return { success: false, error: getErrorMessage(e) };
  }
};
