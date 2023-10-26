'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { GenreRepository } from '../genre.repository';
import { revalidateTag } from 'next/cache';
import { cacheTags } from '@/modules/config/cacheHelper';

export const deleteGenreServerAction = adminGuard(
  async (id: number, subGenreRepository: GenreRepository | null = null) => {
    const repo = subGenreRepository || repository.genre;

    try {
      await repo.delete(id);
      revalidateTag(cacheTags.ALL_GENRES);
      revalidateTag(cacheTags.ADMIN_ALL_TRACKS);
      revalidateTag(cacheTags.RELEASED_TRACK);

      return { success: true };
    } catch (e) {
      console.error('deleteGenreServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
