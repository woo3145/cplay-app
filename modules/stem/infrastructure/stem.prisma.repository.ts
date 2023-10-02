import prisma from '@/lib/db/prisma';
import { StemRepository } from '../domain/stem.repository';
import { CreateStemFormData } from '@/modules/admin/domain/stem.validation';

export class StemPrismaRepository implements StemRepository {
  async create(data: CreateStemFormData) {
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

    return stem;
  }
}
