'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { revalidateTag } from 'next/cache';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { AuthorizationError } from '@/lib/errors';
import { getErrorMessage } from '@/lib/getErrorMessage';

export const toggleLikeTrackServerAction = async (
  userId: string | null,
  trackId: number,
  subTrackRepository: TrackRepository | null = null
): Promise<ServerActionResponse<{ trackId: number; isLiked: boolean }>> => {
  try {
    const repo = subTrackRepository || repository.track;

    if (!userId) {
      throw new AuthorizationError();
    }

    const isAlreadyLiked = await repo.isTrackLikedByUser(userId, trackId);

    if (isAlreadyLiked) {
      await repo.unlikeTrack(userId, trackId);
    } else {
      await repo.likeTrack(userId, trackId);
    }

    revalidateTag(cacheKeys.getLikedTracksByUser(userId));

    return {
      success: true,
      data: {
        trackId,
        isLiked: !isAlreadyLiked,
      },
    };
  } catch (e) {
    console.error('toggleLikeTrackServerAction Error');
    return { success: false, error: getErrorMessage(e) };
  }
};
