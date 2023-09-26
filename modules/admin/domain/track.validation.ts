import { z } from 'zod';

export const CreateTrackFormSchema = z.object({
  title: z.string().min(2, 'title는 필수 입력 사항입니다.'),
  imageUrl: z.string(),
  length: z.number(),
  bpm: z.number(),
  isPublish: z.boolean(),
  moodIds: z.number().array(),
  genresIds: z.number().array(),
  creatorId: z.number(),
});
export type CreateTrackFormData = z.infer<typeof CreateTrackFormSchema>;
