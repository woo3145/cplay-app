'use server';

import bcrypt from 'bcrypt';
import { User as DomainUser } from '@/modules/user/domain/user';
import { UserRepository } from '../domain/user.repository';
import { repository } from '@/modules/config/repository';
import {
  AuthorizeUserFormData,
  AuthorizeUserFormSchema,
} from '../domain/user.validation';

export const userAuthorize = async (
  data: AuthorizeUserFormData,
  subUserRepository: UserRepository | null = null
): Promise<DomainUser> => {
  const { email, password } = AuthorizeUserFormSchema.parse(data);

  const repo = subUserRepository || repository.user;
  const user = await repo.getUserByEmailWithPassword(email);

  if (!user) throw new Error('이메일 또는 패스워드가 잘못되었습니다.');

  if (!user.password) throw new Error('간편 로그인된 계정이 존재합니다.');

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw new Error('이메일 또는 패스워드가 잘못되었습니다.');

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
  };
};
