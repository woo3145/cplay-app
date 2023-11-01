'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import { arraysEqual } from '@/lib/utils';
import { cacheKeys } from '@/modules/config/cacheHelper';
import {
  UsecaseEditPlaylistInput,
  UsecaseEditPlaylistInputSchema,
} from '../validations/EditPlaylistTypes';
import { PlaylistRepository } from '../playlist.repository';

export const editPlaylistServerAction = adminGuard(
  async (
    id: string,
    data: UsecaseEditPlaylistInput,
    subPlaylistRepository: PlaylistRepository | null = null
  ) => {
    const { name, userId, trackIds } =
      UsecaseEditPlaylistInputSchema.parse(data);
    const repo = subPlaylistRepository || repository.playlist;

    const exist = await repo.findOne(id);
    if (!exist) {
      return { success: false, message: '플레이리스트가 존재하지 않습니다.' };
    }

    const updatedField = {
      name: exist.name === name ? undefined : name,
      trackIds: arraysEqual(
        exist.tracks.map((track) => track.id),
        trackIds
      )
        ? undefined
        : trackIds,
    };
    if (Object.values(updatedField).every((val) => val === undefined)) {
      return { success: false, message: '변경 된 내용이 없습니다.' };
    }

    try {
      const result = await repo.edit(id, updatedField);

      if (updatedField.name) {
        revalidateTag(cacheKeys.getPlaylistsByUser(userId));
      }
      revalidateTag(cacheKeys.getPlaylistById(result.id));

      return { success: true, playlist: result };
    } catch (e) {
      console.error('editPlaylistServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
