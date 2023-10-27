'use server';

import { repository } from '@/modules/config/repository';
import { unstable_cache } from 'next/cache';
import { BundleRepository } from '../bundle.repository';
import { cacheKeys } from '@/modules/config/cacheHelper';

// 페이지 네이션 필요
export const getLikedBundlesServerAction = async (
  userId?: string,
  subBundleRepository: BundleRepository | null = null
) => {
  const repo = subBundleRepository || repository.bundle;
  if (!userId) {
    return [];
  }
  try {
    const likedBundles = await unstable_cache(
      async () => {
        const data = await repo.getLikedBundlesByUser(userId);
        console.log(`Prisma 호출: ${cacheKeys.getLikedBundlesByUser(userId)}`);
        return data;
      },
      [cacheKeys.getLikedBundlesByUser(userId)],
      {
        tags: [cacheKeys.getLikedBundlesByUser(userId)],
        revalidate: 3600,
      }
    )();

    return likedBundles;
  } catch (e) {
    console.error('getLikedBundlesServerAction Error: ', e);
    return [];
  }
};
