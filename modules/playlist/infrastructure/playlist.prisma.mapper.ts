import { Genre, Mood, Stem, Track, User, UserPlaylist } from '@prisma/client';
import { UserPlaylist as DomainUserPlaylist } from '../domain/playlist';
import { toTrackDomainModel } from '@/modules/track/infrastructure/track.prisma.mapper';

export const toPlaylistDomainModel = (
  record: UserPlaylist & {
    tracks: (Track & {
      moods: Mood[];
      genres: Genre[];
      stems: Stem[];
      creator: User | null;
    })[];
  }
): DomainUserPlaylist => {
  return {
    id: record.id,
    name: record.name,
    tracks: record.tracks.map((track) => toTrackDomainModel(track)),
    userId: record.userId,
  };
};
