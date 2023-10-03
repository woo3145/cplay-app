'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import {
  DeleteTrackFormData,
  DeleteTrackFormSchema,
} from '../../domain/track.validation';
import { TrackRepository } from '@/modules/track/domain/track.repository';

export const deleteTrackServerAction = adminGuard(
  async (
    data: DeleteTrackFormData,
    subTrackRepository: TrackRepository | null = null
  ) => {
    const { id } = DeleteTrackFormSchema.parse(data);
    const repo = subTrackRepository || repository.track;

    try {
      await repo.delete(id);
      return { success: true };
    } catch (e) {
      return { success: false, message: '서버에 문제가 발생하였습니다.' };
    }
  }
);
