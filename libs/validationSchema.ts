import { z } from 'zod';

export const RegisterUserFormSchema = z.object({
  email: z.string().email('이메일 형식이 잘못되었습니다.'),
  password: z.string().min(6, '패스워드는 6글자 이상이여야 합니다.'),
});
export const SignInFormSchema = z.object({
  email: z.string().email('이메일 형식이 잘못되었습니다.'),
  password: z.string().min(6, '패스워드는 6글자 이상이여야 합니다.'),
});
