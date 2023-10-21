import prisma from '@/lib/db/prisma';
import { GenreRepository } from '../domain/genre.repository';
import { RepositoryCreateGenreInput } from '../domain/validations/CreateGenreTypes';
import { RepositoryEditGenreInput } from '../domain/validations/EditGenreTypes';
import { toGenreDomainModel } from './genre.prisma.mapper';

export class GenrePrismaRepository implements GenreRepository {
  async findOne(id: number) {
    const genre = await prisma.genre.findFirst({ where: { id } });
    if (!genre) return null;
    return toGenreDomainModel(genre);
  }

  async getAll() {
    const genres = await prisma.genre.findMany({ orderBy: { id: 'desc' } });
    if (!genres) return [];
    return genres.map((genre) => toGenreDomainModel(genre));
  }

  async create(data: RepositoryCreateGenreInput) {
    const genre = await prisma.genre.create({
      data: { ...data },
    });

    return toGenreDomainModel(genre);
  }

  async delete(id: number) {
    const exist = await prisma.genre.findFirst({
      where: { id },
      include: {
        tracks: true,
      },
    });

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

    return toGenreDomainModel(updatedGenre);
  }
}
