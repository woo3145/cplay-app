'use server';

import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/modules/user/domain/user.repository';
import { repository } from '@/modules/config/repository';

export interface RegisterUserFormData {
  email: string;
  password: string;
}

export const registerUserServerAction =
  (subUserRepository: UserRepository | null = null) =>
  async (data: RegisterUserFormData) => {
    const RegisterUserFormSchema = z.object({
      email: z.string().email('이메일 형식이 잘못되었습니다.'),
      password: z.string().min(6, '패스워드는 6글자 이상이여야 합니다.'),
    });

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
