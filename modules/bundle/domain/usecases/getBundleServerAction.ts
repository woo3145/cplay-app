'use server';

import { repository } from '@/modules/config/repository';
import { unstable_cache } from 'next/cache';
import { BundleRepository } from '../bundle.repository';
import { cacheKeys } from '@/modules/config/cacheHelper';

// 페이지 네이션 필요
export const getBundleServerAction = async (
  id: number,
  subBundleRepository: BundleRepository | null = null
) => {
  const repo = subBundleRepository || repository.bundle;

  try {
    const track = unstable_cache(
      async () => {
        const data = await repo.findOne(id);
        console.log(`Prisma 호출: ${cacheKeys.getBundle(id)}`);
        return data;
      },
      [cacheKeys.getBundle(id)],
      {
        tags: [cacheKeys.getBundle(id)],
        revalidate: 3600,
      }
    )();
    return track;
  } catch (e) {
    console.error('getBundleServerAction Error: ', e);
    return null;
  }
};
