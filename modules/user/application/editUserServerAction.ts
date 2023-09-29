'use server';

import { repository } from '@/modules/config/repository';
import {
  EditUserFormData,
  EditUserFormSchema,
} from '../domain/user.validation';
import { UserRepository } from '../domain/user.repository';
import { userGuard } from '@/lib/guard/userGuard';

export const editUserServerAction = userGuard(
  async (
    id: string,
    data: EditUserFormData,
    subUserRepository: UserRepository | null = null
  ) => {
    const { name, imageUrl } = EditUserFormSchema.parse(data);
    const repo = subUserRepository || repository.user;

    try {
      const result = await repo.edit(id, { name, imageUrl });
      return { success: true, user: result };
    } catch (e) {
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
