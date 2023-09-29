import prisma from '@/lib/db/prisma';
import { revalidateTag, unstable_cache } from 'next/cache';
import { MoodRepository } from '../domain/mood.repository';
import { EditMoodFormData } from '@/modules/admin/domain/mood.validation';

export class MoodPrismaRepository implements MoodRepository {
  async getAll() {
    const moods = await unstable_cache(
      async () => {
        const data = await prisma.mood.findMany({ orderBy: { id: 'desc' } });
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

  async edit(id: number, { tag }: EditMoodFormData) {
    const exist = await prisma.mood.findFirst({ where: { id } });
    if (!exist) {
      throw new Error('Mood가 존재하지 않습니다.');
    }

    // 기존과 동일한 필드는 undefined로 업데이트 막음
    const updatedField = {
      tag: exist.tag === tag ? undefined : tag,
    };

    // 모든 필드가 undefined라면 기존 mood 반환
    if (Object.values(updatedField).every((val) => val === undefined)) {
      return exist;
    }

    const updatedMood = await prisma.mood.update({
      where: { id },
      data: updatedField,
    });

    revalidateTag('allMoods');

    return updatedMood;
  }
}
