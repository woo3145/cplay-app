import { authOptions } from '@/api/auth/[...nextauth]/route';
import { Role } from '@prisma/client';
import { getServerSession } from 'next-auth';

export const checkAdmin = async () => {
  const session = await getServerSession(authOptions);
  return session?.user.role === Role.ADMIN;
};

export const adminGuard = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      throw new Error('Unauthorized');
    }

    return fn(...args);
  };
};
