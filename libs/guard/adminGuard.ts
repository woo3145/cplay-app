import { authOptions } from '@/api/auth/[...nextauth]/route';
import { Role } from '@prisma/client';
import { getServerSession } from 'next-auth';

export const checkAdmin = async () => {
  const session = await getServerSession(authOptions);
  return session?.user.role === Role.ADMIN;
};

export const adminGuard = (fn: Function) => {
  return async (...args: any[]) => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      throw new Error('Unauthorized');
    }

    return fn(...args);
  };
};
