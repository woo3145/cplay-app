'use server';

import { repository } from '@/modules/config/repository';
import { unstable_cache } from 'next/cache';
import { RepositoryGetBundlesQuery } from '../validations/GetBundlesTypes';
import { BundleRepository } from '../bundle.repository';
import { cacheKeys } from '@/modules/config/cacheHelper';

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

        console.log(
          `Prisma 호출: ${cacheKeys.getReleasedBundlesByType(
            query.type ?? 'all'
          )}`
        );
        return data;
      },
      [cacheKeys.getReleasedBundlesByType(query.type ?? 'all')],
      {
        tags: [
          cacheKeys.getReleasedBundlesByType(query.type ?? 'all'),
          cacheKeys.RELEASED_BUNDLES,
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
