'use server';

import { repository } from '@/modules/config/repository';
import { UserRepository } from '../domain/user.repository';
import { unstable_cache } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { User as DomainUser } from '../domain/user';

export const getSessionUser = async (
  subUserRepository: UserRepository | null = null
): Promise<DomainUser | null> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const repo = subUserRepository || repository.user;
  const user = unstable_cache(
    async () => {
      const data = await repo.findById(session.user.id);
      console.log(`Prisma 호출 : userId-${session.user.id}`);
      return data;
    },
    [`userId-${session.user.id}`],
    { tags: [`userId-${session.user.id}`], revalidate: 3600 }
  )();
  return user;
};
