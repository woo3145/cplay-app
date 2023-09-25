'use server';

import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/modules/user/domain/user.repository';
import { repository } from '@/modules/config/repository';
import {
  RegisterUserFormData,
  RegisterUserFormSchema,
} from '@/modules/user/domain/user.validation';

export const registerUserServerAction = async (
  data: RegisterUserFormData,
  subUserRepository: UserRepository | null = null
) => {
  const result = RegisterUserFormSchema.parse(data);

  const { email, password } = result;

  const repo = subUserRepository || repository.user;
  const exist = await repo.getUserByEmail(email);

  if (exist) {
    return { success: false, message: '이미 사용중인 이메일입니다.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const name = Math.random().toString(36).substring(2, 11);
  const user = await repo.createUser(email, hashedPassword, name);

  return { success: true, user };
};
