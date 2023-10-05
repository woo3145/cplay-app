import { TrackStatus } from '@prisma/client';
import { z } from 'zod';

// client (react-hook-form)
export const CreateTrackFormSchema = z.object({
  title: z.string().min(2, 'title는 필수 입력 사항입니다.'),
  imageUrl: z.string(),
  length: z.coerce.number(), // https://zod.dev/?id=coercion-for-primitives
  bpm: z.coerce.number(),
  status: z.nativeEnum(TrackStatus),
});
export type CreateTrackFormData = z.infer<typeof CreateTrackFormSchema>;

// usecase
export const UsecaseCreateTrackInputSchema = CreateTrackFormSchema.extend({
  moodIds: z.number().array(),
  genreIds: z.number().array(),
  creatorId: z.string(),
});
export type UsecaseCreateTrackInput = z.infer<
  typeof UsecaseCreateTrackInputSchema
>;

// repository
export type RepositoryCreateTrackInput = UsecaseCreateTrackInput;
