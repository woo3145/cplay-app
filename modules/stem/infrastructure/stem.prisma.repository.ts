import prisma from '@/lib/db/prisma';
import { StemRepository } from '../domain/stem.repository';
import { CreateStemFormData } from '@/modules/admin/domain/stem.validation';

export class StemPrismaRepository implements StemRepository {
  async create(data: CreateStemFormData) {
    const { trackId, stemType, mp3Src } = data;
    const stem = await prisma.stem.create({
      data: {
        stemType,
        mp3Src,
        track: {
          connect: { id: trackId },
        },
      },
    });

    return stem;
  }
}
