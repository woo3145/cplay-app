'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { revalidateTag } from 'next/cache';
import { getLikedTracksServerAction } from './getLikedTracksServerAction';
import { cacheTags } from '@/modules/config/cacheHelper';

export const toggleLikeTrackServerAction = async (
  userId: string | null,
  trackId: number,
  subTrackRepository: TrackRepository | null = null
) => {
  const repo = subTrackRepository || repository.track;

  if (!userId) {
    return {
      success: false,
      message: '로그인이 필요합니다.',
    };
  }

  try {
    const likedTracks = await getLikedTracksServerAction(userId);

    const likedTrackIds = likedTracks.map((track) => track.id);

    const isLiked = likedTrackIds.includes(trackId);

    if (isLiked) {
      await repo.unlikeTrack(userId, trackId);
    } else {
      await repo.likeTrack(userId, trackId);
    }

    revalidateTag(cacheTags.getLikedTracksByUser(userId));

    return {
      success: true,
      trackId,
      isLiked: !isLiked,
    };
  } catch (e) {
    console.error('toggleLikeTrackServerAction Error: ', e);
    return { success: false, message: '서버에 문제가 발생하였습니다.' };
  }
};
