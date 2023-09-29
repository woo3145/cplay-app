'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import {
  DeleteGenresFormData,
  DeleteGenresFormSchema,
} from '../../domain/genres.validation';
import { GenresRepository } from '@/modules/genres/domain/genres.repository';

export const deleteGenresServerAction = adminGuard(
  async (
    data: DeleteGenresFormData,
    subGenresRepository: GenresRepository | null = null
  ) => {
    const { id } = DeleteGenresFormSchema.parse(data);
    const repo = subGenresRepository || repository.genres;

    try {
      await repo.delete(id);
      return { success: true };
    } catch (e) {
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
