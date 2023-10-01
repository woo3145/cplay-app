'use server';

import { repository } from '@/modules/config/repository';
import {
  EditUserFormData,
  EditUserFormSchema,
} from '../domain/user.validation';
import { UserRepository } from '../domain/user.repository';
import { userGuard } from '@/lib/guard/userGuard';
import { revalidateTag } from 'next/cache';

export const editUserServerAction = userGuard(
  async (
    id: string,
    data: EditUserFormData,
    subUserRepository: UserRepository | null = null
  ) => {
    const { name, imageUrl } = EditUserFormSchema.parse(data);
    const repo = subUserRepository || repository.user;

    const exist = await repo.findById(id);

    if (!exist) {
      return { success: false, message: 'User가 존재하지 않습니다.' };
    }

    const updatedField = {
      name: exist.name === name ? undefined : name,
      imageUrl: exist.image === imageUrl ? undefined : imageUrl,
    };

    // 모든 필드가 undefined라면 기존 user 반환
    if (Object.values(updatedField).every((val) => val === undefined)) {
      return { success: false, message: '변경 된 내용이 없습니다.' };
    }

    try {
      const result = await repo.edit(id, updatedField);
      revalidateTag(`userId-${id}`);
      return { success: true, user: result };
    } catch (e) {
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
