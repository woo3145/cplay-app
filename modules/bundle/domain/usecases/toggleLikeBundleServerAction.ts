'use server';

import { repository } from '@/modules/config/repository';
import { revalidateTag } from 'next/cache';
import { BundleRepository } from '../bundle.repository';
import { getLikedBundlesServerAction } from './getLikedBundlesServerAction';
import { cacheKeys } from '@/modules/config/cacheHelper';

export const toggleLikeBundleServerAction = async (
  userId: string | null,
  bundleId: number,
  subBundleRepository: BundleRepository | null = null
) => {
  const repo = subBundleRepository || repository.bundle;

  if (!userId) {
    return {
      success: false,
      message: '로그인이 필요합니다.',
    };
  }

  try {
    const likedBundles = await getLikedBundlesServerAction(userId);
    const likedBundleIds = likedBundles.map((track) => track.id);

    const isLiked = likedBundleIds.includes(bundleId);

    if (isLiked) {
      await repo.unlikeBundle(userId, bundleId);
    } else {
      await repo.likeBundle(userId, bundleId);
    }

    revalidateTag(cacheKeys.getLikedBundlesByUser(userId));

    return {
      success: true,
      bundleId,
      isLiked: !isLiked,
    };
  } catch (e) {
    console.error('toggleLikeBundleServerAction Error: ', e);
    return { success: false, message: '서버에 문제가 발생하였습니다.' };
  }
};
