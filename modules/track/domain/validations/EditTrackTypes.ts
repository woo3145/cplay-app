import { TrackStatus } from '@prisma/client';
import { z } from 'zod';

// client (react-hook-form)
export const EditTrackFormSchema = z.object({
  title: z.string().min(2, 'title는 필수 입력 사항입니다.'),
  length: z.coerce.number(), // https://zod.dev/?id=coercion-for-primitives
  bpm: z.coerce.number(),
  key: z.string(),
  status: z.nativeEnum(TrackStatus),
});
export type EditTrackFormData = z.infer<typeof EditTrackFormSchema>;

// usecase
export const UsecaseEditTrackInputSchema = EditTrackFormSchema.extend({
  imageUrl: z.string(),
  moodIds: z.number().array(),
  genreIds: z.number().array(),
  creatorId: z.string(),
});
export type UsecaseEditTrackInput = z.infer<typeof UsecaseEditTrackInputSchema>;

// repository
export type RepositoryEditTrackInput = {
  title: string | undefined;
  imageUrl: string | undefined;
  length: number | undefined;
  bpm: number | undefined;
  status: TrackStatus | undefined;

  moodIds: number[] | undefined;
  genreIds: number[] | undefined;
  creatorId: string | undefined;
};
