import { authOptions } from '@/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const userGuard = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    return fn(...args);
  };
};
