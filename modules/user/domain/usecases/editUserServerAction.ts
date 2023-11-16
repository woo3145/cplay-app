'use server';

import { revalidateTag } from 'next/cache';

import { repository } from '@/modules/config/repository';
import { UserRepository } from '../user.repository';
import { userGuard } from '@/lib/guard/userGuard';
import {
  UsecaseEditUserInput,
  UsecaseEditUserInputSchema,
} from '../validations/EditUserTypes';
import { toUserDomainModel } from '../../infrastructure/user.prisma.mapper';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { User } from '../user';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { NoChangeError } from '@/lib/errors/NoChangeError';
import { ValidationError } from '@/lib/errors';

export const editUserServerAction = userGuard(
  async (
    id: string,
    data: UsecaseEditUserInput,
    subUserRepository: UserRepository | null = null
  ): Promise<ServerActionResponse<User>> => {
    try {
      const parsedResult = UsecaseEditUserInputSchema.safeParse(data);
      const repo = subUserRepository || repository.user;

      if (!parsedResult.success) {
        throw new ValidationError();
      }

      const { name, image } = parsedResult.data;

      const exist = await repo.findById(id, toUserDomainModel);

      const updatedField = {
        name: exist.name === name ? undefined : name,
        image: exist.image === image ? undefined : image,
      };

      // 모든 필드가 undefined라면 기존 user 반환
      if (Object.values(updatedField).every((val) => val === undefined)) {
        throw new NoChangeError();
      }

      const result = await repo.edit(id, updatedField);

      revalidateTag(cacheKeys.getSessionUser(id));

      return { success: true, data: result };
    } catch (e) {
      console.error('editUserServerAction Error');
      return { success: false, error: getErrorMessage(e) };
    }
  }
);
