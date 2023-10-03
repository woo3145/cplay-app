'use server';

import { repository } from '@/modules/config/repository';

// 페이지 네이션 필요
export const getAllTracks = async () => {
  const tracks = await repository.track.findAll();
  return tracks;
};
