'use server';

import { repository } from '@/modules/config/repository';
import { GenreRepository } from '../genre.repository';
import { unstable_cache } from 'next/cache';

export const getAllGenresServerAction = async (
  subGenreRepository: GenreRepository | null = null
) => {
  const repo = subGenreRepository || repository.genre;

  try {
    const genres = unstable_cache(
      async () => {
        const data = await repo.getAll();
        console.log(`Prisma 호출 : allGenres`);
        return data;
      },
      [`allGenres`],
      { tags: [`allGenres`], revalidate: 3600 }
    )();
    return genres;
  } catch (e) {
    console.error('getAllGenresServerAction Error', e);
    return [];
  }
};
