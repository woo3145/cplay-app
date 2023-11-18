'use server';

import { repository } from '@/modules/config/repository';
import { unstable_cache } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { PlaylistRepository } from '../playlist.repository';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { UserPlaylist } from '../playlist';

export const getPlaylistServerAction = async (
  playlistId: string,
  subPlaylistRepository: PlaylistRepository | null = null
): Promise<ServerActionResponse<UserPlaylist>> => {
  try {
    const repo = subPlaylistRepository || repository.playlist;

    const playlist = await unstable_cache(
      async () => {
        const data = await repo.findById(playlistId);
        console.log(`Prisma 호출: ${cacheKeys.getPlaylistById(playlistId)}`);
        return data;
      },
      [cacheKeys.getPlaylistById(playlistId)],
      {
        tags: [cacheKeys.getPlaylistById(playlistId)],
        revalidate: 3600,
      }
    )();

    return { success: true, data: playlist };
  } catch (e) {
    console.error('getPlaylistServerAction Error: ', e);
    return { success: false, error: '서버에 문제가 발생하였습니다.' };
  }
};
