'use server';

import { repository } from '@/modules/config/repository';
import { UserRepository } from '../user.repository';
import { unstable_cache } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { SessionUser as DomainSessionUser } from '../user';

export const getSessionUserServerAction = async (
  subUserRepository: UserRepository | null = null
): Promise<DomainSessionUser | null> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return null;
  }
  const repo = subUserRepository || repository.user;
  try {
    const user = unstable_cache(
      async () => {
        const data = await repo.findSessionUserById(session.user.id);
        console.log(`Prisma 호출 : sessionUser-${session.user.id}`);
        return data;
      },
      [`sessionUser-${session.user.id}`],
      { tags: [`sessionUser-${session.user.id}`], revalidate: 3600 }
    )();
    return user;
  } catch (e) {
    console.log('GetSessionUser Error: ', e);
    return null;
  }
};
