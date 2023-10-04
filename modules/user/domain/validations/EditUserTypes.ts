import z from 'zod';

// client (react-hook-form)
export const EditUserFormSchema = z.object({
  name: z
    .string()
    .min(2, '닉네임은 2 ~ 20글자 사이입니다.')
    .max(20, '닉네임은 2 ~ 20글자 사이입니다.')
    .optional(),
});
export type EditUserFormData = z.infer<typeof EditUserFormSchema>;

// usecase
export const UsecaseEditUserInputSchema = EditUserFormSchema.extend({
  image: z.string().optional(),
});
export type UsecaseEditUserInput = z.infer<typeof UsecaseEditUserInputSchema>;

// repository
export type RepositoryEditUserInput = UsecaseEditUserInput;
