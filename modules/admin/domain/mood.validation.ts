import { z } from 'zod';

export const CreateMoodFormSchema = z.object({
  tag: z.string().min(2, 'tag는 필수 입력 사항입니다.'),
});
export type CreateMoodFormData = z.infer<typeof CreateMoodFormSchema>;
