'use server';

import { repository } from '@/modules/config/repository';
import {
  UsecaseCreatePlaylistInput,
  UsecaseCreatePlaylistInputSchema,
} from '../validations/CreatePlaylistTypes';
import { PlaylistRepository } from '../playlist.repository';
import { revalidateTag } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { userGuard } from '@/lib/guard/userGuard';

export const createPlaylistServerAction = userGuard(
  async (
    data: UsecaseCreatePlaylistInput,
    subPlaylistRepository: PlaylistRepository | null = null
  ) => {
    const parsedData = UsecaseCreatePlaylistInputSchema.parse(data);
    const repo = subPlaylistRepository || repository.playlist;

    try {
      const playlist = await repo.create(parsedData);

      // 캐시 무효화
      revalidateTag(cacheKeys.getPlaylistsByUser(data.userId));

      return { success: true, playlist };
    } catch (e) {
      console.error('createBundleServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
