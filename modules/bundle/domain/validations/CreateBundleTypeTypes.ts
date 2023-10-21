import { z } from 'zod';

// client (react-hook-form)
export const CreateBundleTypeFormSchema = z.object({
  name: z
    .string({
      required_error: 'name는 필수 입력 사항입니다.',
    })
    .min(2, 'name는 2 ~ 10글자 사이입니다.')
    .max(10, 'name는 2 ~ 10글자 사이입니다.'),
});
export type CreateBundleTypeFormData = z.infer<
  typeof CreateBundleTypeFormSchema
>;

// usecase
export const UsecaseCreateBundleTypeInputSchema = CreateBundleTypeFormSchema;
export type UsecaseCreateBundleTypeInput = CreateBundleTypeFormData;

// repository
export type RepositoryCreateBundleTypeInput = {
  name: string;
};
