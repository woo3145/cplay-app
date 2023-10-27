'use server';

import { unstable_cache } from 'next/cache';
import { getServerSession } from 'next-auth';

import { repository } from '@/modules/config/repository';
import { UserRepository } from '../user.repository';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { SessionUser } from '../user';
import { toSessionUserDomainModel } from '../../infrastructure/user.prisma.mapper';
import { cacheKeys } from '@/modules/config/cacheHelper';

export const getSessionUserServerAction = async (
  subUserRepository: UserRepository | null = null
): Promise<SessionUser | null> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return null;
  }
  const repo = subUserRepository || repository.user;
  try {
    const user = unstable_cache(
      async () => {
        const data = await repo.findById(
          session.user.id,
          toSessionUserDomainModel
        );
        console.log(
          `Prisma 호출: ${cacheKeys.getSessionUser(session.user.id)}`
        );
        return data;
      },
      [cacheKeys.getSessionUser(session.user.id)],
      { tags: [cacheKeys.getSessionUser(session.user.id)], revalidate: 3600 }
    )();
    return user;
  } catch (e) {
    console.log('getSessionUserServerAction Error: ', e);
    return null;
  }
};
