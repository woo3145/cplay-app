'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { TrackRepository } from '@/modules/track/domain/track.repository';
import { revalidateTag } from 'next/cache';

export const deleteTrackServerAction = adminGuard(
  async (id: number, subTrackRepository: TrackRepository | null = null) => {
    const repo = subTrackRepository || repository.track;

    try {
      const deletedTrack = await repo.delete(id);
      revalidateTag('allTracks');
      revalidateTag(`track-${id}`);
      revalidateTag(`releasedTracks-all`);
      deletedTrack.genres.forEach((genre) => {
        revalidateTag(`releasedTracks-${genre.slug}`);
      });

      return { success: true };
    } catch (e) {
      console.error('deleteTrackServerAction Error: ', e);
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
