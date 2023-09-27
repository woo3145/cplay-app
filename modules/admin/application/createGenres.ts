'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/libs/guard/adminGuard';
import { GenresRepository } from '@/modules/genres/domain/genres.repository';
import {
  CreateGenresFormData,
  CreateGenresFormSchema,
} from '../domain/genres.validation';

export const createGenres = adminGuard(
  async (
    data: CreateGenresFormData,
    subGenresRepository: GenresRepository | null = null
  ) => {
    const { tag, slug } = CreateGenresFormSchema.parse(data);
    const repo = subGenresRepository || repository.genres;
    const genres = await repo.createGenres(tag, slug);

    return genres;
  }
);
