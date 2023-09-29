'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { GenresRepository } from '@/modules/genres/domain/genres.repository';
import {
  CreateGenresFormData,
  CreateGenresFormSchema,
} from '../../domain/genres.validation';

export const createGenresServerAction = adminGuard(
  async (
    data: CreateGenresFormData,
    subGenresRepository: GenresRepository | null = null
  ) => {
    // Validation Error
    const { tag, slug } = CreateGenresFormSchema.parse(data);
    const repo = subGenresRepository || repository.genres;

    try {
      const genres = await repo.createGenres(tag, slug);

      return { success: true, genres };
    } catch (e) {
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
