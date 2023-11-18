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
import { ValidationError } from '@/lib/errors';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { UserPlaylist } from '../playlist';

export const createPlaylistServerAction = userGuard(
  async (
    data: UsecaseCreatePlaylistInput,
    subPlaylistRepository: PlaylistRepository | null = null
  ): Promise<ServerActionResponse<UserPlaylist>> => {
    try {
      const parsedResult = UsecaseCreatePlaylistInputSchema.safeParse(data);
      const repo = subPlaylistRepository || repository.playlist;

      if (!parsedResult.success) {
        throw new ValidationError();
      }

      const playlist = await repo.create(parsedResult.data);

      // 캐시 무효화
      revalidateTag(cacheKeys.getPlaylistsByUser(data.userId));

      return { success: true, data: playlist };
    } catch (e) {
      console.error('createBundleServerAction Error', e);
      return { success: false, error: '서버에 문제가 발생하였습니다.' };
    }
  }
);
