import { authOptions } from '@/api/auth/[...nextauth]/route';
import { Role } from '@prisma/client';
import { getServerSession } from 'next-auth';

export const adminGuard = (fn: Function) => {
  return async (...args: any[]) => {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user.role === Role.ADMIN;
    if (!isAdmin) {
      throw new Error('Unauthorized');
    }

    return fn(...args);
  };
};
