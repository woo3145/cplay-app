import { z } from 'zod';

export const EditUserFormSchema = z.object({
  name: z
    .string()
    .min(2, '닉네임은 2 ~ 20글자 사이입니다.')
    .max(20, '닉네임은 2 ~ 20글자 사이입니다.')
    .optional(),

  imageUrl: z.string().optional(),
});
export type EditUserFormData = z.infer<typeof EditUserFormSchema>;

export const ChangePasswordFormSchema = z
  .object({
    oldPassword: z
      .string({
        required_error: '해당 필드는 필수 입력 사항입니다.',
      })
      .min(1, '해당 필드는 필수 입력 사항입니다.'),
    newPassword: z
      .string({
        required_error: '새 패스워드는 필수 입력 사항입니다.',
      })
      .min(8, '패스워드는 8글자 이상입니다.'),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    path: ['newPassword'],
    message: '기존 패스워드와 일치합니다.',
  });

export type ChangePasswordFormData = z.infer<typeof ChangePasswordFormSchema>;
