'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { StemRepository } from '../stem.repository';
import {
  UsecaseCreateStemInput,
  UsecaseCreateStemInputSchema,
} from '../validations/CreateStemTypes';
import { revalidateTag } from 'next/cache';

export const createStemServerAction = adminGuard(
  async (
    data: UsecaseCreateStemInput,
    subStemRepository: StemRepository | null = null
  ) => {
    const { trackId, src, stemType } = UsecaseCreateStemInputSchema.parse(data);
    const repo = subStemRepository || repository.stem;

    try {
      const stem = await repo.create({ trackId, src, stemType });

      revalidateTag(`track-${trackId}`);
      revalidateTag(`releasedTracks`);

      return { success: true, stem };
    } catch (e) {
      console.error('createStemServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
