import z from 'zod';

// client (react-hook-form)
export const ChangePasswordFormSchema = z
  .object({
    oldPassword: z
      .string({ required_error: '해당 필드는 필수 입력 사항입니다.' })
      .min(1, '해당 필드는 필수 입력 사항입니다.'),
    newPassword: z
      .string({ required_error: '새 패스워드는 필수 입력 사항입니다.' })
      .min(8, '패스워드는 8글자 이상입니다.'),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    path: ['newPassword'],
    message: '기존 패스워드와 일치합니다.',
  });

export type ChangePasswordFormData = z.infer<typeof ChangePasswordFormSchema>;

// usecase
export const UsecaseChangePasswordInputSchema = z.object({
  newPassword: z
    .string({ required_error: '해당 필드는 필수 입력 사항입니다.' })
    .min(8, '패스워드는 8글자 이상입니다.'),
});
export type UsecaseEditUserInput = z.infer<
  typeof UsecaseChangePasswordInputSchema
>;

// repository
export type RepositoryChangePasswordInput = UsecaseEditUserInput;
