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

  tracks: Track[];
  types: BundleType[];
}
