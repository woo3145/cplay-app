import { z } from 'zod';

// client (react-hook-form)
export const EditPlaylistFormSchema = z.object({
  name: z.string().min(1, 'name은 필수 입력 사항입니다.'),
});
export type EditPlaylistFormData = z.infer<typeof EditPlaylistFormSchema>;

// usecase
export const UsecaseEditPlaylistInputSchema = EditPlaylistFormSchema.extend({
  userId: z.string(),
  trackIds: z.number().array(),
});
export type UsecaseEditPlaylistInput = z.infer<
  typeof UsecaseEditPlaylistInputSchema
>;

// repository
export type RepositoryEditPlaylistInput = {
  name: string | undefined;
  trackIds: number[] | undefined;
};
