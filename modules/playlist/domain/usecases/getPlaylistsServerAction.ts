'use server';

import { repository } from '@/modules/config/repository';
import { unstable_cache } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { PlaylistRepository } from '../playlist.repository';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { UserPlaylist } from '../playlist';
import { AuthorizationError } from '@/lib/errors';

// 페이지 네이션 필요
export const getPlaylistsServerAction = async (
  userId?: string,
  subPlaylistRepository: PlaylistRepository | null = null
): Promise<ServerActionResponse<UserPlaylist[]>> => {
  try {
    const repo = subPlaylistRepository || repository.playlist;

    if (!userId) {
      throw new AuthorizationError();
    }

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

    return { success: true, data: playlists };
  } catch (e) {
    console.error('getPlaylistsServerAction Error: ', e);
    return { success: false, error: '서버에 문제가 발생하였습니다.' };
  }
};
