'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import { User as DomainUser } from '@/modules/user/domain/user';
import { UserRepository } from '../domain/user.repository';
import { repository } from '@/modules/config/repository';

export const userAuthorize =
  (subUserRepository: UserRepository | null = null) =>
  async (data: { email?: string; password?: string }): Promise<DomainUser> => {
    const AuthorizeUserFormSchema = z.object({
      email: z.string().email('이메일 형식이 잘못되었습니다.'),
      password: z.string({
        required_error: '패스워드는 필수 입력 사항입니다.',
      }),
    });

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
