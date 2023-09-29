import { z } from 'zod';

export const CreateMoodFormSchema = z.object({
  tag: z
    .string({
      required_error: 'tag는 필수 입력 사항입니다.',
    })
    .min(2, 'tag는 2 ~ 10글자 사이입니다.')
    .max(10, 'tag는 2 ~ 10글자 사이입니다.'),
});
export type CreateMoodFormData = z.infer<typeof CreateMoodFormSchema>;

export const DeleteMoodFormSchema = z.object({
  id: z.number({
    required_error: 'id는 필수 입력 사항입니다.',
  }),
});
export type DeleteMoodFormData = z.infer<typeof DeleteMoodFormSchema>;

export const EditMoodFormSchema = z.object({
  tag: z
    .string()
    .min(2, 'tag는 2 ~ 10글자 사이입니다.')
    .max(10, 'tag는 2 ~ 10글자 사이입니다.'),
});
export type EditMoodFormData = z.infer<typeof EditMoodFormSchema>;
