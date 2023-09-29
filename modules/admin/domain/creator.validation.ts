import { z } from 'zod';

export const CreateCreatorFormSchema = z.object({
  name: z
    .string({
      required_error: 'name는 필수 입력 사항입니다.',
    })
    .min(2, 'name은 2 ~ 20글자 사이입니다.')
    .max(20, 'name은 2 ~ 20글자 사이입니다.'),
  creativeType: z
    .string({
      required_error: 'creativeType은 필수 입력 사항입니다.',
    })
    .min(2, 'creativeType은 2 ~ 20글자 사이입니다.')
    .max(20, 'creativeType은 2 ~ 20글자 사이입니다.'),
  imageUrl: z.string(),
});
export type CreateCreatorFormData = z.infer<typeof CreateCreatorFormSchema>;
