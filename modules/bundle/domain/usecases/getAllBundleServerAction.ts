'use server';

import { unstable_cache } from 'next/cache';
import { repository } from '@/modules/config/repository';
import { BundleRepository } from '../bundle.repository';
import { cacheKeys } from '@/modules/config/cacheHelper';

export const getAllBundlesServerAction = async (
  subBundleRepository: BundleRepository | null = null
) => {
  const repo = subBundleRepository || repository.bundle;

  try {
    const bundles = unstable_cache(
      async () => {
        const data = await repo.getAll();
        console.log(`Prisma 호출 : ${cacheKeys.ADMIN_ALL_BUNDLES}`);
        return data;
      },
      [cacheKeys.ADMIN_ALL_BUNDLES],
      { tags: [cacheKeys.ADMIN_ALL_BUNDLES], revalidate: 3600 }
    )();
    return bundles;
  } catch (e) {
    console.error('getAllBundlesServerAction Error: ', e);
    return [];
  }
};
