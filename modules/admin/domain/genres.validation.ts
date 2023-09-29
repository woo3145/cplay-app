import { z } from 'zod';

export const CreateGenresFormSchema = z.object({
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
export type CreateGenresFormData = z.infer<typeof CreateGenresFormSchema>;

export const DeleteGenresFormSchema = z.object({
  id: z.number({
    required_error: "'id는 필수 입력 사항입니다.'",
  }),
});
export type DeleteGenresFormData = z.infer<typeof DeleteGenresFormSchema>;

export const EditGenresFormSchema = z.object({
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
export type EditGenresFormData = z.infer<typeof EditGenresFormSchema>;
