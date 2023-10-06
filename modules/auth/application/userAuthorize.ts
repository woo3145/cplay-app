'use server';

import bcrypt from 'bcrypt';
import { User as SessionUser } from '@/modules/user/domain/user';
import { UserRepository } from '../../user/domain/user.repository';
import { repository } from '@/modules/config/repository';
import {
  AuthorizeUserFormData,
  AuthorizeUserFormSchema,
} from '@/modules/auth/domain/user.auth.validation';

export const userAuthorize = async (
  data: AuthorizeUserFormData,
  subUserRepository: UserRepository | null = null
): Promise<SessionUser> => {
  const { email, password } = AuthorizeUserFormSchema.parse(data);

  const repo = subUserRepository || repository.user;
  const user = await repo.findByEmailWithPassword(email, 'session');

  if (!user) throw new Error('이메일 또는 패스워드가 잘못되었습니다.');

  if (!user.password) throw new Error('간편 로그인된 계정이 존재합니다.');

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw new Error('이메일 또는 패스워드가 잘못되었습니다.');

  const { password: _, ...rest } = user;

  return rest;
};
