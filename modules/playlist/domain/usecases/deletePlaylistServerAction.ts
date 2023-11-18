'use server';

import { repository } from '@/modules/config/repository';
import { revalidateTag } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { PlaylistRepository } from '../playlist.repository';
import { userGuard } from '@/lib/guard/userGuard';
import { ServerActionResponse } from '@/types/ServerActionResponse';

export const deletePlaylistServerAction = userGuard(
  async (
    id: string,
    userId: string,
    subPlaylistRepository: PlaylistRepository | null = null
  ): Promise<ServerActionResponse<void>> => {
    try {
      const repo = subPlaylistRepository || repository.playlist;

      await repo.delete(id);

      revalidateTag(cacheKeys.getPlaylistsByUser(userId));
      revalidateTag(cacheKeys.getPlaylistById(id));

      return { success: true, data: undefined };
    } catch (e) {
      console.error('deletePlaylistServerAction Error: ', e);
      return { success: false, error: '서버에 문제가 발생하였습니다.' };
    }
  }
);
