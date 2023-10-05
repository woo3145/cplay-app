'use server';

import { unstable_cache } from 'next/cache';
import { repository } from '@/modules/config/repository';
import { MoodRepository } from '../mood.repository';

export const getAllMoodsServerAction = async (
  subMoodRepository: MoodRepository | null = null
) => {
  const repo = subMoodRepository || repository.mood;

  try {
    const moods = unstable_cache(
      async () => {
        const data = await repo.getAll();
        console.log(`Prisma 호출 : allMoods`);
        return data;
      },
      [`allMoods`],
      { tags: [`allMoods`], revalidate: 3600 }
    )();
    return moods;
  } catch (e) {
    console.error('getAllMoodsServerAction Error: ', e);
    return [];
  }
};
