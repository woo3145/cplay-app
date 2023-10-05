'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { GenreRepository } from '../genre.repository';
import { revalidateTag } from 'next/cache';
import {
  UsecaseCreateGenreInput,
  UsecaseCreateGenreInputSchema,
} from '../validations/CreateGenreTypes';

export const createGenreServerAction = adminGuard(
  async (
    data: UsecaseCreateGenreInput,
    subGenresRepository: GenreRepository | null = null
  ) => {
    // Validation Error
    const { tag, slug } = UsecaseCreateGenreInputSchema.parse(data);
    const repo = subGenresRepository || repository.genre;

    try {
      const genres = await repo.create({ tag, slug });
      revalidateTag('allGenres');

      return { success: true, genres };
    } catch (e) {
      console.error('createGenreServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
