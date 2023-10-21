import { Track } from '@/modules/track/domain/track';

export interface BundleType {
  id: number;
  name: string;
}

export interface Bundle {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: Date;

  tracks: Track[];
  types: BundleType[];
}
