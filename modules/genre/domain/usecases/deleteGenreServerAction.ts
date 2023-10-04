'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { GenreRepository } from '../genre.repository';
import { revalidateTag } from 'next/cache';

export const deleteGenreServerAction = adminGuard(
  async (id: number, subGenreRepository: GenreRepository | null = null) => {
    const repo = subGenreRepository || repository.genre;

    try {
      await repo.delete(id);
      revalidateTag('allGenres');

      return { success: true };
    } catch (e) {
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
