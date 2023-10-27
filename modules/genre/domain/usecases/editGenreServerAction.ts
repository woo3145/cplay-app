'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { GenreRepository } from '../genre.repository';
import {
  UsecaseEditGenreInput,
  UsecaseEditGenreInputSchema,
} from '../validations/EditGenreTypes';
import { revalidateTag } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';

export const editGenreServerAction = adminGuard(
  async (
    id: number,
    data: UsecaseEditGenreInput,
    subGenreRepository: GenreRepository | null = null
  ) => {
    const { tag, slug } = UsecaseEditGenreInputSchema.parse(data);
    const repo = subGenreRepository || repository.genre;

    const exist = await repo.findOne(id);
    if (!exist) {
      return { success: false, message: '장르가 존재하지 않습니다.' };
    }

    const updatedField = {
      tag: exist.tag === tag ? undefined : tag,
      slug: exist.slug === slug ? undefined : slug,
    };

    if (Object.values(updatedField).every((val) => val === undefined)) {
      return { success: false, message: '변경 된 내용이 없습니다.' };
    }

    try {
      const result = await repo.edit(id, { tag, slug });
      revalidateTag(cacheKeys.ALL_GENRES);
      revalidateTag(cacheKeys.ADMIN_ALL_TRACKS);
      revalidateTag(cacheKeys.RELEASED_TRACKS);
      return { success: true, genre: result };
    } catch (e) {
      console.error('editGenreServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
