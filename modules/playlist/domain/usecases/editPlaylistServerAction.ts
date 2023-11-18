'use server';

import { repository } from '@/modules/config/repository';
import { revalidateTag } from 'next/cache';
import { isEqual } from '@/lib/utils';
import { cacheKeys } from '@/modules/config/cacheHelper';
import {
  UsecaseEditPlaylistInput,
  UsecaseEditPlaylistInputSchema,
} from '../validations/EditPlaylistTypes';
import { PlaylistRepository } from '../playlist.repository';
import { userGuard } from '@/lib/guard/userGuard';
import { ValidationError } from '@/lib/errors';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { UserPlaylist } from '../playlist';

export const editPlaylistServerAction = userGuard(
  async (
    id: string,
    data: UsecaseEditPlaylistInput,
    subPlaylistRepository: PlaylistRepository | null = null
  ): Promise<ServerActionResponse<UserPlaylist>> => {
    try {
      const parsedResult = UsecaseEditPlaylistInputSchema.safeParse(data);
      const repo = subPlaylistRepository || repository.playlist;

      if (!parsedResult.success) {
        throw new ValidationError();
      }

      const { name, userId, trackIds } = parsedResult.data;

      const exist = await repo.findById(id);

      const updatedField = {
        name: isEqual(exist.name, name) ? undefined : name,
        trackIds: isEqual(
          exist.tracks.map((track) => track.id),
          trackIds
        )
          ? undefined
          : trackIds,
      };

      if (Object.values(updatedField).every((val) => val === undefined)) {
        return { success: false, error: '변경 된 내용이 없습니다.' };
      }

      const result = await repo.edit(id, updatedField);

      revalidateTag(cacheKeys.getPlaylistsByUser(userId));
      revalidateTag(cacheKeys.getPlaylistById(result.id));

      return { success: true, data: result };
    } catch (e) {
      console.error('editPlaylistServerAction Error', e);
      return { success: false, error: '서버에 문제가 발생하였습니다.' };
    }
  }
);
