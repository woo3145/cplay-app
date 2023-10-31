import { z } from 'zod';

// client (react-hook-form)
export const CreatePlaylistFormSchema = z.object({
  name: z.string().min(1, 'name은 필수 입력 사항입니다.'),
});
export type CreatePlaylistFormData = z.infer<typeof CreatePlaylistFormSchema>;

// usecase
export const UsecaseCreatePlaylistInputSchema = CreatePlaylistFormSchema.extend(
  {
    trackIds: z.number().array(),
    userId: z.string(),
  }
);
export type UsecaseCreatePlaylistInput = z.infer<
  typeof UsecaseCreatePlaylistInputSchema
>;

// repository
export type RepositoryCreatePlaylistInput = UsecaseCreatePlaylistInput;
