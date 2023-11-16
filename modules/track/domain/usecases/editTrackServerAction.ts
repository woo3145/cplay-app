'use server';

import { repository } from '@/modules/config/repository';
import { adminGuard } from '@/lib/guard/adminGuard';
import { revalidateTag } from 'next/cache';
import {
  UsecaseEditTrackInput,
  UsecaseEditTrackInputSchema,
} from '../validations/EditTrackTypes';
import { TrackRepository } from '../track.repository';
import { isEqual } from '@/lib/utils';
import { cacheKeys } from '@/modules/config/cacheHelper';
import { Track, TrackStatus } from '../track';
import { ServerActionResponse } from '@/types/ServerActionResponse';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { ValidationError } from '@/lib/errors';

export const editTrackServerAction = adminGuard(
  async (
    id: number,
    data: UsecaseEditTrackInput,
    subTrackRepository: TrackRepository | null = null
  ): Promise<ServerActionResponse<Track>> => {
    try {
      const parsedResult = UsecaseEditTrackInputSchema.safeParse(data);
      const repo = subTrackRepository || repository.track;
      if (!parsedResult.success) {
        throw new ValidationError();
      }

      const {
        title,
        imageUrl,
        length,
        bpm,
        key,
        status,
        creatorId,
        moodIds,
        genreIds,
      } = parsedResult.data;

      const exist = await repo.findById(id);

      // 기존 데이터와 변동이 없는 필드는 undefined로 변환
      const updatedField = {
        title: isEqual(exist.title, title) ? undefined : title,
        imageUrl: isEqual(exist.imageUrl, imageUrl) ? undefined : imageUrl,
        length: isEqual(exist.length, length) ? undefined : length,
        bpm: isEqual(exist.bpm, bpm) ? undefined : bpm,
        key: isEqual(exist.key, key) ? undefined : key,
        status: isEqual(exist.status, status) ? undefined : status,
        creatorId: isEqual(exist.creator?.id, creatorId)
          ? undefined
          : creatorId,
        moodIds: isEqual(
          exist.moods.map((mood) => mood.id),
          moodIds
        )
          ? undefined
          : moodIds,
        genreIds: isEqual(
          exist.genres.map((genre) => genre.id),
          genreIds
        )
          ? undefined
          : genreIds,
      };

      if (Object.values(updatedField).every((val) => val === undefined)) {
        return { success: false, error: '변경 된 내용이 없습니다.' };
      }

      const result = await repo.edit(id, updatedField);

      revalidateTag(cacheKeys.ADMIN_ALL_TRACKS);
      revalidateTag(cacheKeys.getTrack(result.id));

      // status가 publish 였거나 publish 로 수정될때만 releasedTrack 캐시 무효화
      if (
        exist.status === TrackStatus.PUBLISH ||
        result.status === TrackStatus.PUBLISH
      ) {
        revalidateTag(cacheKeys.RELEASED_TRACKS);
      }

      return { success: true, data: result };
    } catch (e) {
      console.error('editTrackServerAction Error');
      return { success: false, error: getErrorMessage(e) };
    }
  }
);
