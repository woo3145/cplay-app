import prisma from '@/lib/db/prisma';
import { StemRepository } from '../domain/stem.repository';
import { RepositoryCreateStemInput } from '../domain/validations/CreateStemTypes';
import { Stem } from '../domain/stem';

export class StemPrismaRepository implements StemRepository {
  toDomainModel(record: any) {
    return {
      id: record.id,
      stemType: record.stemType,
      src: record.src,
    } as Stem;
  }

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

    return this.toDomainModel(stem);
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
