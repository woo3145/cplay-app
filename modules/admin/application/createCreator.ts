'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '../adminGuard';
import {
  CreateCreatorFormData,
  CreateCreatorFormSchema,
} from '../domain/creator.validation';
import { CreatorRepository } from '@/modules/creator/domain/creator.repository';

export const createCreator = adminGuard(
  async (
    data: CreateCreatorFormData,
    subCreatorRepository: CreatorRepository | null = null
  ) => {
    const parsedData = CreateCreatorFormSchema.parse(data);
    const repo = subCreatorRepository || repository.creator;
    const creator = await repo.createCreator(parsedData);

    return creator;
  }
);
