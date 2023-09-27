import { z } from 'zod';

export const CreateStemFormSchema = z.object({
  trackId: z.number({ required_error: 'trackId는 필수 입력 사항입니다.' }),
  stemType: z.string().min(2, 'stemType은 필수 입력 사항입니다.'),
  mp3Src: z.string().min(2, 'mp3Src는 필수 입력 사항입니다.'),
});
export type CreateStemFormData = z.infer<typeof CreateStemFormSchema>;
