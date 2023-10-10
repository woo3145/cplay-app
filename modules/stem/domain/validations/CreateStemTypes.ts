import { z } from 'zod';
import { StemType } from '../stem';

// client (react-hook-form)
export const CreateStemFormSchema = z.object({
  stemType: z.nativeEnum(StemType),
});
export type CreateStemFormData = z.infer<typeof CreateStemFormSchema>;

// usecase
export const UsecaseCreateStemInputSchema = z.object({
  trackId: z.number(),
  stemType: z.nativeEnum(StemType),
  src: z.string(),
});
export type UsecaseCreateStemInput = z.infer<
  typeof UsecaseCreateStemInputSchema
>;

// repository
export type RepositoryCreateStemInput = {
  trackId: number;
  stemType: StemType;
  src: string;
};
