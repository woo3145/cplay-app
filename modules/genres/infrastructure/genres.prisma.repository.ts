import prisma from '@/lib/db/prisma';
import { GenresRepository } from '../domain/genres.repository';
import { revalidateTag, unstable_cache } from 'next/cache';

export class GenresPrismaRepository implements GenresRepository {
  async getAllGenres() {
    const genres = await unstable_cache(
      async () => {
        const data = await prisma.genres.findMany({});
        console.log('Prisma 호출 : Genres');
        return data;
      },
      ['allGenres'],
      { tags: ['allGenres'], revalidate: 3600 }
    )();
    if (!genres) return [];

    return genres;
  }

  async createGenres(tag: string, slug: string) {
    const genres = await prisma.genres.create({
      data: {
        tag,
        slug,
      },
    });
    revalidateTag('allGenres');

    return genres;
  }
}
