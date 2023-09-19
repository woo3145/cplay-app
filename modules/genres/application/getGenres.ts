'use server';

import { repository } from '@/modules/config/repository';

export const getAllGenres = async () => {
  const genres = await repository.genres.getAllGenres();
  return genres;
};
