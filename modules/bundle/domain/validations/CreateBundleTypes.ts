import { z } from 'zod';

// client (react-hook-form)
export const CreateBundleFormSchema = z.object({
  name: z.string().min(2, 'name은 필수 입력 사항입니다.'),
});
export type CreateBundleFormData = z.infer<typeof CreateBundleFormSchema>;

// usecase
export const UsecaseCreateBundleInputSchema = CreateBundleFormSchema.extend({
  imageUrl: z.string(),
  typeIds: z.number().array(),
  trackIds: z.number().array(),
});
export type UsecaseCreateBundleInput = z.infer<
  typeof UsecaseCreateBundleInputSchema
>;

// repository
export type RepositoryCreateBundleInput = UsecaseCreateBundleInput;
