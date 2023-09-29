import prisma from '@/lib/db/prisma';
import { revalidateTag, unstable_cache } from 'next/cache';
import { MoodRepository } from '../domain/mood.repository';

export class MoodPrismaRepository implements MoodRepository {
  async getAll() {
    const moods = await unstable_cache(
      async () => {
        const data = await prisma.mood.findMany({});
        console.log('Prisma 호출 : Mood');
        return data;
      },
      ['allMoods'],
      { tags: ['allMoods'], revalidate: 3600 }
    )();
    if (!moods) return [];

    return moods;
  }

  async create(tag: string) {
    const mood = await prisma.mood.create({
      data: {
        tag,
      },
    });
    revalidateTag('allMoods');

    return mood;
  }

  async delete(id: number) {
    const exist = await prisma.mood.findFirst({ where: { id } });

    if (!exist) {
      throw new Error('Mood가 존재하지 않습니다.');
    }

    await prisma.mood.delete({ where: { id } });

    revalidateTag('allMoods');
  }
}
