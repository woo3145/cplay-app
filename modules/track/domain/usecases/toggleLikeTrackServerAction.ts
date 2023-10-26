'use server';

import { repository } from '@/modules/config/repository';
import { TrackRepository } from '../track.repository';
import { revalidateTag, unstable_cache } from 'next/cache';

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
    const likedTracks = await unstable_cache(
      async () => {
        const data = await repo.getLikedTracksByUser(userId);
        console.log(`Prisma 호출 : likedTracks-${userId}`);
        return data;
      },
      [`likedTracks-${userId}`],
      {
        tags: [`likedTracks-${userId}`],
        revalidate: 3600,
      }
    )();

    const likedTrackIds = likedTracks.map((track) => track.id);

    const isLiked = likedTrackIds.includes(trackId);

    if (isLiked) {
      await repo.unlikeTrack(userId, trackId);
    } else {
      await repo.likeTrack(userId, trackId);
    }

    revalidateTag(`likedTracks-${userId}`);

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
