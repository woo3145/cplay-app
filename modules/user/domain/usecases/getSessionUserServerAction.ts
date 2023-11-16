'use server';

import { unstable_cache } from 'next/cache';

import { repository } from '@/modules/config/repository';
import { UserRepository } from '../user.repository';
import { SessionUser } from '../user';
import { toSessionUserDomainModel } from '../../infrastructure/user.prisma.mapper';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { NotFoundError } from '@/lib/errors';
import { getErrorMessage } from '@/lib/getErrorMessage';

export const getSessionUserServerAction = async (
  userId: string,
  subUserRepository: UserRepository | null = null
): Promise<ServerActionResponse<SessionUser>> => {
  try {
    const repo = subUserRepository || repository.user;

    const user = await unstable_cache(
      async () => {
        const data = await repo.findById(userId, toSessionUserDomainModel);
        console.log(`Prisma 호출: ${cacheKeys.getSessionUser(userId)}`);
        return data;
      },
      [cacheKeys.getSessionUser(userId)],
      { tags: [cacheKeys.getSessionUser(userId)], revalidate: 3600 }
    )();

    if (!user) {
      throw new NotFoundError('유저를 찾을 수 없습니다.');
    }

    return { success: true, data: user };
  } catch (e) {
    console.log('getSessionUserServerAction Error: ', e);
    return { success: false, error: getErrorMessage(e) };
  }
};
