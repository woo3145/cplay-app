'use server';

import * as bcrypt from 'bcrypt';
import { repository } from '@/modules/config/repository';
import { UserRepository } from '../user.repository';
import { userGuard } from '@/lib/guard/userGuard';
import {
  ChangePasswordFormData,
  ChangePasswordFormSchema,
} from '../validations/ChangePasswordTypes';
import { toUserDomainModel } from '../../infrastructure/user.prisma.mapper';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { AuthenticationError, ValidationError } from '@/lib/errors';

export const changePasswordServerAction = userGuard(
  async (
    id: string,
    data: ChangePasswordFormData,
    subUserRepository: UserRepository | null = null
  ): Promise<ServerActionResponse<void>> => {
    try {
      const parsedResult = ChangePasswordFormSchema.safeParse(data);

      if (!parsedResult.success) {
        throw new ValidationError();
      }
      const { oldPassword, newPassword } = parsedResult.data;

      const repo = subUserRepository || repository.user;

      const user = await repo.findByIdWithPassword(id, toUserDomainModel);

      if (!user.password) {
        throw new ValidationError('간편 로그인된 계정입니다.');
      }

      const isValid = await bcrypt.compare(oldPassword, user.password);
      if (!isValid) {
        throw new AuthenticationError('기존 패스워드가 잘못되었습니다.');
      }

      await repo.changePassword(id, { newPassword });

      return { success: true, data: undefined };
    } catch (e) {
      console.error('changePasswordServerAction Error');
      return { success: false, error: getErrorMessage(e) };
    }
  }
);
