import prisma from '@/lib/db/prisma';
import { StemRepository } from '../domain/stem.repository';
import { RepositoryCreateStemInput } from '../domain/validations/CreateStemTypes';
import { toStemDomainModel } from './stem.prisma.mapper';
import { handlePrismaError } from '@/lib/prismaErrorHandler';
import { NotFoundError } from '@/lib/errors';

export class StemPrismaRepository implements StemRepository {
  async create(data: RepositoryCreateStemInput) {
    try {
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
    } catch (e) {
      console.error(`StemPrismaRepository: create`, e);
      throw handlePrismaError(e);
    }
  }

  async delete(id: number) {
    try {
      const exist = await prisma.stem.findFirst({ where: { id } });

      if (!exist) {
        throw new NotFoundError('Stem이 존재하지 않습니다.');
      }

      await prisma.stem.delete({ where: { id } });

      return toStemDomainModel(exist);
    } catch (e) {
      console.error(`StemPrismaRepository: delete`, e);
      throw handlePrismaError(e);
    }
  }
}
