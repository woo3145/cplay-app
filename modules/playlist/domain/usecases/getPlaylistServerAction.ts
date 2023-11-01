'use server';

import { repository } from '@/modules/config/repository';
import { unstable_cache } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { PlaylistRepository } from '../playlist.repository';

// 페이지 네이션 필요
export const getPlaylistServerAction = async (
  playlistId?: string,
  subPlaylistRepository: PlaylistRepository | null = null
) => {
  const repo = subPlaylistRepository || repository.playlist;
  if (!playlistId) {
    return null;
  }
  try {
    const playlist = await unstable_cache(
      async () => {
        const data = await repo.findOne(playlistId);
        console.log(`Prisma 호출: ${cacheKeys.getPlaylistById(playlistId)}`);
        return data;
      },
      [cacheKeys.getPlaylistById(playlistId)],
      {
        tags: [cacheKeys.getPlaylistById(playlistId)],
        revalidate: 3600,
      }
    )();

    return playlist;
  } catch (e) {
    console.error('getPlaylistServerAction Error: ', e);
    return null;
  }
};
