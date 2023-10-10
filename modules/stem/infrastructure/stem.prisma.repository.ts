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
}
