'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { GenresRepository } from '@/modules/genres/domain/genres.repository';
import {
  EditGenresFormData,
  EditGenresFormSchema,
} from '../../domain/genres.validation';

export const editGenresServerAction = adminGuard(
  async (
    id: number,
    data: EditGenresFormData,
    subGenresRepository: GenresRepository | null = null
  ) => {
    const { tag, slug } = EditGenresFormSchema.parse(data);
    const repo = subGenresRepository || repository.genres;

    try {
      const result = await repo.edit(id, { tag, slug });
      return { success: true, genres: result };
    } catch (e) {
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
