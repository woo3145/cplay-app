'use server';

import { repository } from '@/modules/config/repository';
import { unstable_cache } from 'next/cache';
import { RepositoryGetBundlesQuery } from '../domain/validations/GetBundlesTypes';
import { BundleRepository } from '../domain/bundle.repository';

export const getReleasedBundlesServerAction = async (
  query: Pick<RepositoryGetBundlesQuery, 'type'>,
  subBundleRepository: BundleRepository | null = null
) => {
  const repo = subBundleRepository || repository.bundle;

  try {
    const bundles = unstable_cache(
      async () => {
        const data = await repo.findAllWithQuery({
          type: query.type === 'all' ? undefined : query.type,
          page: 1,
          count: 12,
        });

        console.log(`Prisma 호출 : releasedBundles-${query.type}`);
        return data;
      },
      [`releasedBundles-${query.type}`, 'releasedBundles', 'allBundles'],
      {
        tags: [
          `releasedBundles-${query.type}`,
          'releasedBundles',
          'allBundles',
        ],
        revalidate: 3600,
      }
    )();

    return bundles;
  } catch (e) {
    console.error('getReleasedBundlesServerAction Error: ', e);
    return [];
  }
};
