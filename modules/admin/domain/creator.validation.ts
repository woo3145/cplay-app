import { z } from 'zod';

export const CreateCreatorFormSchema = z.object({
  name: z.string().min(2, 'name는 필수 입력 사항입니다.'),
  creativeType: z.string().min(2, 'creativeType은 필수 입력 사항입니다.'),
  imageUrl: z.string(),
});
export type CreateCreatorFormData = z.infer<typeof CreateCreatorFormSchema>;
