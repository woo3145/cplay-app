import { z } from 'zod';

export const CreateGenresFormSchema = z.object({
  tag: z.string().min(2, 'tag는 필수 입력 사항입니다.'),
  slug: z.string().min(2, 'slug는 필수 입력 사항입니다.'),
});
export type CreateGenresFormData = z.infer<typeof CreateGenresFormSchema>;

export const DeleteGenresFormSchema = z.object({
  id: z.number({
    required_error: "'id는 필수 입력 사항입니다.'",
  }),
});
export type DeleteGenresFormData = z.infer<typeof DeleteGenresFormSchema>;
