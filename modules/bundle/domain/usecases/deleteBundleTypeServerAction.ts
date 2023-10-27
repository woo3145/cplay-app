'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import { BundleTypeRepository } from '../bundle.repository';
import { cacheKeys } from '@/modules/config/cacheHelper';

export const deleteBundleTypeServerAction = adminGuard(
  async (
    id: number,
    subBundleTypeRepository: BundleTypeRepository | null = null
  ) => {
    const repo = subBundleTypeRepository || repository.bundleType;

    try {
      await repo.delete(id);
      revalidateTag(cacheKeys.ALL_BUNDLE_TYPE);
      revalidateTag(cacheKeys.ADMIN_ALL_BUNDLES);
      revalidateTag(cacheKeys.RELEASED_TRACKS);

      return { success: true };
    } catch (e) {
      console.error('deleteBundleTypeServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
