'use server';

import { unstable_cache } from 'next/cache';
import { repository } from '@/modules/config/repository';
import { BundleTypeRepository } from '../bundle.repository';
import { cacheKeys } from '@/modules/config/cacheHelper';

export const getAllBundleTypesServerAction = async (
  subBundleTypeRepository: BundleTypeRepository | null = null
) => {
  const repo = subBundleTypeRepository || repository.bundleType;

  try {
    const bundleTypes = unstable_cache(
      async () => {
        const data = await repo.getAll();
        console.log(`Prisma 호출: ${cacheKeys.ALL_BUNDLE_TYPE}`);
        return data;
      },
      [cacheKeys.ALL_BUNDLE_TYPE],
      { tags: [cacheKeys.ALL_BUNDLE_TYPE], revalidate: 3600 }
    )();
    return bundleTypes;
  } catch (e) {
    console.error('getAllBundleTypesServerAction Error: ', e);
    return [];
  }
};
