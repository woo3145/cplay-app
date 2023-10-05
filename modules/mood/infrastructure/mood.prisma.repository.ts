import prisma from '@/lib/db/prisma';
import { revalidateTag, unstable_cache } from 'next/cache';
import { MoodRepository } from '../domain/mood.repository';
import { EditMoodFormData } from '@/modules/admin/domain/mood.validation';
import { RepositoryEditMoodInput } from '../domain/validations/EditMoodTypes';
import { RepositoryCreateMoodInput } from '../domain/validations/CreateMoodTypes';

export class MoodPrismaRepository implements MoodRepository {
  toDomainModel(record: any) {
    return {
      id: record.id,
      tag: record.tag,
    };
  }

  async findOne(id: number) {
    const mood = await prisma.mood.findFirst({ where: { id } });
    if (!mood) return null;
    return this.toDomainModel(mood);
  }

  async getAll() {
    const moods = await prisma.mood.findMany({ orderBy: { id: 'desc' } });
    if (!moods) return [];
    return moods;
  }

  async create({ tag }: RepositoryCreateMoodInput) {
    const mood = await prisma.mood.create({
      data: {
        tag,
      },
    });
    return mood;
  }

  async delete(id: number) {
    const exist = await prisma.mood.findFirst({ where: { id } });

    if (!exist) {
      throw new Error('Mood가 존재하지 않습니다.');
    }

    await prisma.mood.delete({ where: { id } });
  }

  async edit(id: number, updatedField: RepositoryEditMoodInput) {
    const updatedMood = await prisma.mood.update({
      where: { id },
      data: updatedField,
    });

    return updatedMood;
  }
}
