'use server';

import * as bcrypt from 'bcrypt';
import { repository } from '@/modules/config/repository';
import { UserRepository } from '../user.repository';
import { userGuard } from '@/lib/guard/userGuard';
import {
  ChangePasswordFormData,
  ChangePasswordFormSchema,
} from '../validations/ChangePasswordTypes';

export const changePasswordServerAction = userGuard(
  async (
    id: string,
    data: ChangePasswordFormData,
    subUserRepository: UserRepository | null = null
  ) => {
    const { oldPassword, newPassword } = ChangePasswordFormSchema.parse(data);
    const repo = subUserRepository || repository.user;

    const user = await repo.findUserByIdWithPassword(id);

    if (!user) {
      return { success: false, message: 'User가 존재하지 않습니다.' };
    }

    if (!user.password) {
      return { success: false, message: '간편 로그인된 계정입니다.' };
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      return {
        success: false,
        message: '기존 패스워드가 잘못되었습니다.',
      };
    }

    await repo.changePassword(id, { newPassword });

    return { success: true };
  }
);
