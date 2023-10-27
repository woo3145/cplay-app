'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { BundleTypeRepository } from '../bundle.repository';
import {
  UsecaseCreateBundleTypeInput,
  UsecaseCreateBundleTypeInputSchema,
} from '../validations/CreateBundleTypeTypes';
import { revalidateTag } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';

export const createBundleTypeServerAction = adminGuard(
  async (
    data: UsecaseCreateBundleTypeInput,
    subBundleTypeRepository: BundleTypeRepository | null = null
  ) => {
    const { name } = UsecaseCreateBundleTypeInputSchema.parse(data);
    const repo = subBundleTypeRepository || repository.bundleType;

    try {
      const bundleType = await repo.create({ name });
      revalidateTag(cacheKeys.ALL_BUNDLE_TYPE);

      return { success: true, bundleType };
    } catch (e) {
      console.error('createBundleTypeServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
