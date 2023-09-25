import prisma from '@/libs/db/prisma';
import { revalidateTag, unstable_cache } from 'next/cache';
import { MoodRepository } from '../domain/mood.repository';

export class MoodPrismaRepository implements MoodRepository {
  async getAllMoods() {
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

  async createMood(tag: string) {
    const mood = await prisma.mood.create({
      data: {
        tag,
      },
    });
    revalidateTag('allMoods');

    return mood;
  }
}
