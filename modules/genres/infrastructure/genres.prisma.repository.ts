import prisma from '@/lib/db/prisma';
import { GenresRepository } from '../domain/genres.repository';
import { revalidateTag, unstable_cache } from 'next/cache';

export class GenresPrismaRepository implements GenresRepository {
  async getAll() {
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

  async create(tag: string, slug: string) {
    const genres = await prisma.genres.create({
      data: {
        tag,
        slug,
      },
    });
    revalidateTag('allGenres');

    return genres;
  }

  async delete(id: number) {
    const exist = await prisma.genres.findFirst({ where: { id } });

    if (!exist) {
      throw new Error('Genres가 존재하지 않습니다.');
    }

    await prisma.genres.delete({ where: { id } });

    revalidateTag('allGenres');
  }
}
