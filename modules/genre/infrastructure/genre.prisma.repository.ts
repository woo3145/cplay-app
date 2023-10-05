import prisma from '@/lib/db/prisma';
import { GenreRepository } from '../domain/genre.repository';
import { RepositoryCreateGenreInput } from '../domain/validations/CreateGenreTypes';
import { RepositoryEditGenreInput } from '../domain/validations/EditGenreTypes';

export class GenrePrismaRepository implements GenreRepository {
  toDomainModel(record: any) {
    return {
      id: record.id,
      tag: record.tag,
      slug: record.slug,
    };
  }

  async findOne(id: number) {
    const genre = await prisma.genre.findFirst({ where: { id } });
    if (!genre) return null;
    return this.toDomainModel(genre);
  }

  async getAll() {
    const genres = await prisma.genre.findMany({ orderBy: { id: 'desc' } });
    if (!genres) return [];
    return genres.map((genre) => this.toDomainModel(genre));
  }

  async create(data: RepositoryCreateGenreInput) {
    const genre = await prisma.genre.create({
      data: { ...data },
    });

    return this.toDomainModel(genre);
  }

  async delete(id: number) {
    const exist = await prisma.genre.findFirst({ where: { id } });

    if (!exist) {
      throw new Error('Genres가 존재하지 않습니다.');
    }
    // 연결 된 참조 끊기
    await prisma.genre.update({
      where: { id },
      data: {
        tracks: {
          set: [],
        },
      },
    });
    await prisma.genre.delete({ where: { id } });
  }

  async edit(id: number, data: RepositoryEditGenreInput) {
    const updatedGenre = await prisma.genre.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return this.toDomainModel(updatedGenre);
  }
}
