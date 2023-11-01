'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { PlaylistRepository } from '../playlist.repository';

export const deletePlaylistServerAction = adminGuard(
  async (
    id: string,
    userId: string,
    subPlaylistRepository: PlaylistRepository | null = null
  ) => {
    const repo = subPlaylistRepository || repository.playlist;

    try {
      await repo.delete(id);

      revalidateTag(cacheKeys.getPlaylistsByUser(userId));
      revalidateTag(cacheKeys.getPlaylistById(id));

      return { success: true };
    } catch (e) {
      console.error('deletePlaylistServerAction Error: ', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
