'use server';

import { RegisterUserFormSchema } from '@/libs/validationSchema';
import { z } from 'zod';
import prisma from '@/prisma';
import * as bcrypt from 'bcrypt';

export type RegisterUserInput = z.infer<typeof RegisterUserFormSchema>;

export const registerUser = async (data: RegisterUserInput) => {
  const result = RegisterUserFormSchema.parse(data);

  const { email, password } = result;
  const exist = await prisma.user.findUnique({ where: { email } });

  if (exist) {
    return { success: false, message: '이미 사용중인 이메일입니다.' };
  }

  // 메일 인증 구현 예정

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: Math.random().toString(36).substring(2, 11),
      email,
      password: hashedPassword,
    },
  });

  return { success: true, user };
};
