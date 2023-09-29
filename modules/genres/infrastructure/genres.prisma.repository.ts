import prisma from '@/lib/db/prisma';
import { GenresRepository } from '../domain/genres.repository';
import { revalidateTag, unstable_cache } from 'next/cache';
import { EditGenresFormData } from '@/modules/admin/domain/genres.validation';

export class GenresPrismaRepository implements GenresRepository {
  async getAll() {
    const genres = await unstable_cache(
      async () => {
        const data = await prisma.genres.findMany({ orderBy: { id: 'desc' } });
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

  async edit(id: number, { tag, slug }: EditGenresFormData) {
    const exist = await prisma.genres.findFirst({ where: { id } });
    if (!exist) {
      throw new Error('Genres가 존재하지 않습니다.');
    }

    // 기존과 동일한 필드는 undefined로 업데이트 막음
    const updatedField = {
      tag: exist.tag === tag ? undefined : tag,
      slug: exist.slug === slug ? undefined : slug,
    };

    // 모든 필드가 undefined라면 기존 genres 반환
    if (Object.values(updatedField).every((val) => val === undefined)) {
      return exist;
    }

    const updatedGenres = await prisma.genres.update({
      where: { id },
      data: updatedField,
    });

    revalidateTag('allGenres');

    return updatedGenres;
  }
}
