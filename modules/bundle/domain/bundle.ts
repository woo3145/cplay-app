import { Track } from '@/modules/track/domain/track';

export interface BundleType {
  id: number;
  name: string;
}

export enum BundleStatus {
  HIDDEN = 'HIDDEN',
  PUBLISH = 'PUBLISH',
}

export interface Bundle {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: Date;
  status: BundleStatus;
  likedByUser: boolean; // 유저가 좋아요를 눌렀는지 여부

  tracks: Track[];
  types: BundleType[];
}
