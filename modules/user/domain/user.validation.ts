import { z } from 'zod';

// Register
export const RegisterUserFormSchema = z.object({
  email: z.string().email('이메일 형식이 잘못되었습니다.'),
  password: z.string().min(6, '패스워드는 6글자 이상이여야 합니다.'),
});
export type RegisterUserFormData = z.infer<typeof RegisterUserFormSchema>;

// Login
export const AuthorizeUserFormSchema = z.object({
  email: z.string().email('이메일 형식이 잘못되었습니다.'),
  password: z.string().min(1, '패스워드는 필수 입력 사항입니다.'),
});
export type AuthorizeUserFormData = z.infer<typeof AuthorizeUserFormSchema>;
