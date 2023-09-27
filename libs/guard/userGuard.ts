import { authOptions } from '@/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const userGuard = (fn: Function) => {
  return async (...args: any[]) => {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    return fn(...args);
  };
};
