'use server';

import { repository } from '@/modules/config/repository';
import { UserRepository } from '../domain/user.repository';

export const getUserServerAction = async (
  userId: string,
  subUserRepository: UserRepository | null = null
) => {
  const repo = subUserRepository || repository.user;
  const user = await repo.findById(userId);
  return user;
};
