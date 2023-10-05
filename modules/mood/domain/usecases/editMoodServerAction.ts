'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { MoodRepository } from '@/modules/mood/domain/mood.repository';
import {
  UsecaseEditMoodInput,
  UsecaseEditMoodInputSchema,
} from '../validations/EditMoodTypes';
import { revalidateTag } from 'next/cache';

export const editMoodServerAction = adminGuard(
  async (
    id: number,
    data: UsecaseEditMoodInput,
    subMoodRepository: MoodRepository | null = null
  ) => {
    const { tag } = UsecaseEditMoodInputSchema.parse(data);
    const repo = subMoodRepository || repository.mood;

    const exist = await repo.findOne(id);
    if (!exist) {
      return { success: false, message: 'Mood가 존재하지 않습니다.' };
    }

    // 기존과 동일한 필드는 undefined로 업데이트 막음
    const updatedField = {
      tag: exist.tag === tag ? undefined : tag,
    };

    // 모든 필드가 undefined라면 기존 mood 반환
    if (Object.values(updatedField).every((val) => val === undefined)) {
      return { success: false, message: '변경 된 내용이 없습니다.' };
    }

    try {
      const result = await repo.edit(id, { tag });
      revalidateTag('allMoods');
      revalidateTag('allTracks');

      return { success: true, mood: result };
    } catch (e) {
      console.error('editMoodServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
