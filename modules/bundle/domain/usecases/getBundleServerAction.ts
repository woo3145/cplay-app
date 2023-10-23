'use server';

import { repository } from '@/modules/config/repository';
import { unstable_cache } from 'next/cache';
import { BundleRepository } from '../bundle.repository';

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
        console.log(`Prisma 호출 : bundle-${id}`);
        return data;
      },
      [`bundle-${id}`, 'allBundles'],
      { tags: [`bundle-${id}`, 'allBundles'], revalidate: 3600 }
    )();
    return track;
  } catch (e) {
    console.error('getBundleServerAction Error: ', e);
    return null;
  }
};
