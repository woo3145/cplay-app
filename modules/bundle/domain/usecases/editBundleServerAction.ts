'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import { arraysEqual } from '@/lib/utils';
import {
  UsecaseEditBundleInput,
  UsecaseEditBundleInputSchema,
} from '../validations/EditBundleTypes';
import { BundleRepository } from '../bundle.repository';

export const editBundleServerAction = adminGuard(
  async (
    id: number,
    data: UsecaseEditBundleInput,
    subBundleRepository: BundleRepository | null = null
  ) => {
    const { name, status, imageUrl, typeIds, trackIds } =
      UsecaseEditBundleInputSchema.parse(data);
    const repo = subBundleRepository || repository.bundle;

    const exist = await repo.findOne(id);
    if (!exist) {
      return { success: false, message: '번들이 존재하지 않습니다.' };
    }

    const updatedField = {
      name: exist.name === name ? undefined : name,
      imageUrl: exist.imageUrl === imageUrl ? undefined : imageUrl,
      status: exist.status === status ? undefined : status,
      typeIds: arraysEqual(
        exist.types.map((type) => type.id),
        typeIds
      )
        ? undefined
        : typeIds,
      trackIds: arraysEqual(
        exist.tracks.map((track) => track.id),
        trackIds
      )
        ? undefined
        : trackIds,
    };
    console.log(updatedField);
    if (Object.values(updatedField).every((val) => val === undefined)) {
      return { success: false, message: '변경 된 내용이 없습니다.' };
    }

    try {
      const result = await repo.edit(id, updatedField);

      revalidateTag('allBundles');
      return { success: true, bundle: result };
    } catch (e) {
      console.error('editBundleServerAction Error', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
