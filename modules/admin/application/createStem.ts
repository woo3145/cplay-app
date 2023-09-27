'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import {
  CreateStemFormData,
  CreateStemFormSchema,
} from '../domain/stem.validation';
import { StemRepository } from '@/modules/stem/domain/stem.repository';

export const createStem = adminGuard(
  async (
    data: CreateStemFormData,
    subStemRepository: StemRepository | null = null
  ) => {
    const parsedData = CreateStemFormSchema.parse(data);
    const repo = subStemRepository || repository.stem;
    const stem = await repo.create(parsedData);

    return stem;
  }
);
