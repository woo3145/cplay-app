'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import {
  UsecaseCreateBundleInput,
  UsecaseCreateBundleInputSchema,
} from '../validations/CreateBundleTypes';
import { BundleRepository } from '../bundle.repository';

export const createBundleServerAction = adminGuard(
  async (
    data: UsecaseCreateBundleInput,
    subBundleRepository: BundleRepository | null = null
  ) => {
    const parsedData = UsecaseCreateBundleInputSchema.parse(data);
    const repo = subBundleRepository || repository.bundle;

    try {
      const bundle = await repo.create(parsedData);
      revalidateTag('allBundles');

      return { success: true, bundle };
    } catch (e) {
      console.error('createBundleServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
