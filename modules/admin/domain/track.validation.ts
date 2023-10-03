import { TrackState } from '@prisma/client';
import { z } from 'zod';

export const CreateTrackFormSchema = z.object({
  title: z.string().min(2, 'title는 필수 입력 사항입니다.'),
  imageUrl: z.string(),
  length: z.number(),
  bpm: z.number(),
  isPublish: z.nativeEnum(TrackState),
});
export type CreateTrackFormData = z.infer<typeof CreateTrackFormSchema>;

// moodIds: z.number().array(),
// genresIds: z.number().array(),
// creatorId: z.string(),

export const DeleteTrackFormSchema = z.object({
  id: z.number({
    required_error: 'id는 필수 입력 사항입니다.',
  }),
});
export type DeleteTrackFormData = z.infer<typeof DeleteTrackFormSchema>;
