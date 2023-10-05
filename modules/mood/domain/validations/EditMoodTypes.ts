import { z } from 'zod';

// client (react-hook-form)
export const EditMoodFormSchema = z.object({
  tag: z
    .string({
      required_error: 'tag는 필수 입력 사항입니다.',
    })
    .min(2, 'tag는 2 ~ 10글자 사이입니다.')
    .max(10, 'tag는 2 ~ 10글자 사이입니다.'),
});
export type EditMoodFormData = z.infer<typeof EditMoodFormSchema>;

// usecase
export const UsecaseEditMoodInputSchema = EditMoodFormSchema;
export type UsecaseEditMoodInput = EditMoodFormData;

// repository
export type RepositoryEditMoodInput = {
  tag: string | undefined;
};
