import { z } from 'zod';

// client (react-hook-form)
export const EditBundleFormSchema = z.object({
  name: z.string().min(2, 'name은 필수 입력 사항입니다.'),
});
export type EditBundleFormData = z.infer<typeof EditBundleFormSchema>;

// usecase
export const UsecaseEditBundleInputSchema = EditBundleFormSchema.extend({
  imageUrl: z.string(),
  typeIds: z.number().array(),
  trackIds: z.number().array(),
});
export type UsecaseEditBundleInput = z.infer<
  typeof UsecaseEditBundleInputSchema
>;

// repository
export type RepositoryEditBundleInput = {
  name: string | undefined;
  imageUrl: string | undefined;
  typeIds: number[] | undefined;
  trackIds: number[] | undefined;
};
