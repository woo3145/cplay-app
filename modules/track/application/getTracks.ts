'use server';

import { repository } from '@/modules/config/repository';

// 페이지 네이션 필요
export const getTracks = async () => {
  const genres = await repository.track.getTracks();
  return genres;
};
