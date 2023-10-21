import { z } from 'zod';

// client (react-hook-form)
export const EditBundleTypeFormSchema = z.object({
  name: z
    .string({
      required_error: 'name는 필수 입력 사항입니다.',
    })
    .min(2, 'name는 2 ~ 10글자 사이입니다.')
    .max(10, 'name는 2 ~ 10글자 사이입니다.'),
});
export type EditBundleTypeFormData = z.infer<typeof EditBundleTypeFormSchema>;

// usecase
export const UsecaseEditBundleTypeInputSchema = EditBundleTypeFormSchema;
export type UsecaseEditBundleTypeInput = EditBundleTypeFormData;

// repository
export type RepositoryEditBundleTypeInput = {
  name: string | undefined;
};
