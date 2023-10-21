'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import {
  UsecaseEditBundleTypeInput,
  UsecaseEditBundleTypeInputSchema,
} from '../validations/EditBundleTypeTypes';
import { BundleTypeRepository } from '../bundle.repository';

export const editBundleTypeServerAction = adminGuard(
  async (
    id: number,
    data: UsecaseEditBundleTypeInput,
    subBundleTypeRepository: BundleTypeRepository | null = null
  ) => {
    const { name } = UsecaseEditBundleTypeInputSchema.parse(data);
    const repo = subBundleTypeRepository || repository.bundleType;

    const exist = await repo.findOne(id);
    if (!exist) {
      return { success: false, message: 'BundleType가 존재하지 않습니다.' };
    }

    // 기존과 동일한 필드는 undefined로 업데이트 막음
    const updatedField = {
      tag: exist.name === name ? undefined : name,
    };

    if (Object.values(updatedField).every((val) => val === undefined)) {
      return { success: false, message: '변경 된 내용이 없습니다.' };
    }

    try {
      const result = await repo.edit(id, { name });
      revalidateTag('allBundleTypes');

      return { success: true, mood: result };
    } catch (e) {
      console.error('editBundleTypeServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
