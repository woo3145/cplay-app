import prisma from '@/lib/db/prisma';
import { revalidateTag, unstable_cache } from 'next/cache';
import { CreatorRepository } from '../domain/creator.repository';
import { CreateCreatorFormData } from '@/modules/admin/domain/creator.validation';

export class CreatorPrismaRepository implements CreatorRepository {
  async getAllCreators() {
    const creators = await unstable_cache(
      async () => {
        const data = await prisma.creator.findMany({});
        console.log('Prisma 호출 : Creator');
        return data;
      },
      ['allCreators'],
      { tags: ['allCreators'], revalidate: 3600 }
    )();
    if (!creators) return [];

    return creators;
  }

  async createCreator({ name, creativeType, imageUrl }: CreateCreatorFormData) {
    const creator = await prisma.creator.create({
      data: {
        name,
        creativeType,
        imageUrl,
      },
    });
    revalidateTag('allCreators');

    return creator;
  }
}
