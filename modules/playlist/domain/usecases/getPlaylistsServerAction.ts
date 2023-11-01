'use server';

import { repository } from '@/modules/config/repository';
import { unstable_cache } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { PlaylistRepository } from '../playlist.repository';

// 페이지 네이션 필요
export const getPlaylistsServerAction = async (
  userId?: string,
  subPlaylistRepository: PlaylistRepository | null = null
) => {
  const repo = subPlaylistRepository || repository.playlist;
  if (!userId) {
    return [];
  }
  try {
    const playlists = await unstable_cache(
      async () => {
        const data = await repo.findAllByUserId(userId);
        console.log(`Prisma 호출: ${cacheKeys.getPlaylistsByUser(userId)}`);
        return data;
      },
      [cacheKeys.getPlaylistsByUser(userId)],
      {
        tags: [cacheKeys.getPlaylistsByUser(userId)],
        revalidate: 3600,
      }
    )();

    return playlists;
  } catch (e) {
    console.error('getPlaylistsServerAction Error: ', e);
    return [];
  }
};
