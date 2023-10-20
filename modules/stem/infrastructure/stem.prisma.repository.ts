import prisma from '@/lib/db/prisma';
import { StemRepository } from '../domain/stem.repository';
import { RepositoryCreateStemInput } from '../domain/validations/CreateStemTypes';
import { toStemDomainModel } from './stem.prisma.mapper';

export class StemPrismaRepository implements StemRepository {
  async create(data: RepositoryCreateStemInput) {
    const { trackId, stemType, src } = data;
    const stem = await prisma.stem.create({
      data: {
        stemType,
        src,
        track: {
          connect: { id: trackId },
        },
      },
    });

    return toStemDomainModel(stem);
  }

  async delete(id: number) {
    const exist = await prisma.stem.findFirst({ where: { id } });

    if (!exist) {
      throw new Error('Mood가 존재하지 않습니다.');
    }

    await prisma.stem.delete({ where: { id } });

    return exist.trackId;
  }
}
