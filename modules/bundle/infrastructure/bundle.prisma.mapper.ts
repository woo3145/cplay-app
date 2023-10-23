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
import { isBundleStatus } from '../domain/bundle.type.guard';

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
  if (!isBundleStatus(record.status)) {
    throw new Error('Invalid Bundle Type');
  }

  return {
    id: record.id,
    name: record.name,
    imageUrl: record.imageUrl,
    createdAt: record.createdAt,
    status: record.status,
    types: record.types.map((item) => toBundleTypeDomainModel(item)),
    tracks: record.tracks.map((item) => toTrackDomainModel(item.track)),
  };
};
