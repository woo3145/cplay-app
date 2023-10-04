import { z } from 'zod';

// client (react-hook-form)
export const CreateGenreFormSchema = z.object({
  tag: z
    .string({
      required_error: 'tag는 필수 입력 사항입니다.',
    })
    .min(2, 'tag는 2 ~ 10글자 사이입니다.')
    .max(10, 'tag는 2 ~ 10글자 사이입니다.'),
  slug: z
    .string({
      required_error: 'slug는 필수 입력 사항입니다.',
    })
    .min(2, 'slug는 2 ~ 10글자 사이입니다.')
    .max(10, 'slug는 2 ~ 10글자 사이입니다.'),
});
export type CreateGenreFormData = z.infer<typeof CreateGenreFormSchema>;

// usecase
export const UsecaseCreateGenreInputSchema = CreateGenreFormSchema;
export type UsecaseCreateGenreInput = CreateGenreFormData;

// repository
export type RepositoryCreateGenreInput = UsecaseCreateGenreInput;
