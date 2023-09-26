'use server';

import { repository } from '@/modules/config/repository';

export const getAllCreators = async () => {
  const creators = await repository.creator.getAllCreators();
  return creators;
};
