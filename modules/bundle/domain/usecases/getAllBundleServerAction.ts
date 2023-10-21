'use server';

import { unstable_cache } from 'next/cache';
import { repository } from '@/modules/config/repository';
import { BundleRepository } from '../bundle.repository';

export const getAllBundlesServerAction = async (
  subBundleRepository: BundleRepository | null = null
) => {
  const repo = subBundleRepository || repository.bundle;

  try {
    const bundles = unstable_cache(
      async () => {
        const data = await repo.getAll();
        console.log(`Prisma 호출 : allBundles`);
        return data;
      },
      [`allBundles`],
      { tags: [`allBundles`], revalidate: 3600 }
    )();
    return bundles;
  } catch (e) {
    console.error('getAllBundlesServerAction Error: ', e);
    return [];
  }
};
