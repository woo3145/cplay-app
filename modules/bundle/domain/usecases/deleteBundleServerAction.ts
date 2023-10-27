'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import { BundleRepository } from '../bundle.repository';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { BundleStatus } from '../bundle';

export const deleteBundleServerAction = adminGuard(
  async (id: number, subBundleRepository: BundleRepository | null = null) => {
    const repo = subBundleRepository || repository.bundle;

    try {
      const exist = await repo.delete(id);

      revalidateTag(cacheKeys.ADMIN_ALL_BUNDLES);

      if (exist.status === BundleStatus.PUBLISH) {
        revalidateTag(cacheKeys.RELEASED_BUNDLES);
      }

      return { success: true };
    } catch (e) {
      console.error('deleteBundleServerAction Error: ', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
