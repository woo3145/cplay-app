'use server';

import { revalidateTag } from 'next/cache';

import { repository } from '@/modules/config/repository';
import { UserRepository } from '../user.repository';
import { userGuard } from '@/lib/guard/userGuard';
import {
  UsecaseEditUserInput,
  UsecaseEditUserInputSchema,
} from '../validations/EditUserTypes';

export const editUserServerAction = userGuard(
  async (
    id: string,
    data: UsecaseEditUserInput,
    subUserRepository: UserRepository | null = null
  ) => {
    const { name, image } = UsecaseEditUserInputSchema.parse(data);
    const repo = subUserRepository || repository.user;

    const exist = await repo.findUserById(id);
    if (!exist) {
      return { success: false, message: 'User가 존재하지 않습니다.' };
    }

    const updatedField = {
      name: exist.name === name ? undefined : name,
      image: exist.image === image ? undefined : image,
    };

    // 모든 필드가 undefined라면 기존 user 반환
    if (Object.values(updatedField).every((val) => val === undefined)) {
      return { success: false, message: '변경 된 내용이 없습니다.' };
    }

    try {
      const result = await repo.edit(id, updatedField);
      revalidateTag(`sessionUser-${id}`);
      return { success: true, user: result };
    } catch (e) {
      console.error('Edit User Error: ', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
