'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import { BundleRepository } from '../bundle.repository';

export const deleteBundleServerAction = adminGuard(
  async (id: number, subBundleRepository: BundleRepository | null = null) => {
    const repo = subBundleRepository || repository.bundle;

    try {
      await repo.delete(id);
      revalidateTag('allBundles');

      return { success: true };
    } catch (e) {
      console.error('deleteBundleServerAction Error: ', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
