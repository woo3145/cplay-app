import {
  Bundle,
  BundleTrack,
  BundleType,
  Genre,
  Mood,
  Stem,
  Track,
  User,
} from '@prisma/client';
import {
  BundleType as DomainBundleType,
  Bundle as DomainBundle,
} from '../domain/bundle';
import { toTrackDomainModel } from '@/modules/track/infrastructure/track.prisma.mapper';

export const toBundleTypeDomainModel = (
  record: BundleType
): DomainBundleType => {
  return {
    id: record.id,
    name: record.name,
  };
};

export const toBundleDomainModel = (
  record: Bundle & {
    types: BundleType[];
    tracks: (BundleTrack & {
      track: Track & {
        moods: Mood[];
        genres: Genre[];
        stems: Stem[];
        creator: User | null;
      };
    })[];
  }
): DomainBundle => {
  return {
    id: record.id,
    name: record.name,
    imageUrl: record.imageUrl,
    createdAt: record.createdAt,
    types: record.types.map((item) => toBundleTypeDomainModel(item)),
    tracks: record.tracks.map((item) => toTrackDomainModel(item.track)),
  };
};
