import { Genre, Mood, Stem, Track, User } from '@prisma/client';
import { Track as DomainTrack } from '../domain/track';
import { isTrackStatus } from '../domain/track.type.guard';
import { toGenreDomainModel } from '@/modules/genre/infrastructure/genre.prisma.mapper';
import { toMoodDomainModel } from '@/modules/mood/infrastructure/mood.prisma.mapper';
import { toStemDomainModel } from '@/modules/stem/infrastructure/stem.prisma.mapper';
import { toUserDomainModel } from '@/modules/user/infrastructure/user.prisma.mapper';

export const toTrackDomainModel = (
  record: Track & {
    moods: Mood[];
    genres: Genre[];
    stems: Stem[];
    creator: User | null;
  }
): DomainTrack => {
  if (!isTrackStatus(record.status)) {
    throw new Error('Invalid Track Type');
  }
  return {
    id: record.id,
    title: record.title,
    imageUrl: record.imageUrl,
    length: record.length,
    bpm: record.bpm,
    key: record.key,
    status: record.status,
    createdAt: record.createdAt,
    releaseDate: record.releaseDate,
    likedByUser: false, // default 값

    genres: record.genres.map((item) => {
      return toGenreDomainModel(item);
    }),
    moods: record.moods.map((item) => {
      return toMoodDomainModel(item);
    }),
    stems: record.stems.map((item) => {
      return toStemDomainModel(item);
    }),
    creator: record.creator ? toUserDomainModel(record.creator) : null,
  };
};
