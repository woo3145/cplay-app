import prisma from '@/lib/db/prisma';
import { trackIncludes } from '@/modules/track/infrastructure/track.prisma.repository';
import { TrackStatus } from '@/modules/track/domain/track';
import { PlaylistRepository } from '../domain/playlist.repository';
import { toPlaylistDomainModel } from './playlist.prisma.mapper';
import { RepositoryCreatePlaylistInput } from '../domain/validations/CreatePlaylistTypes';
import { RepositoryEditPlaylistInput } from '../domain/validations/EditPlaylistTypes';

export const playlistIncludes = {
  tracks: {
    where: {
      status: TrackStatus.PUBLISH,
    },
    include: trackIncludes,
  },
};

export class PlaylistPrismaRepository implements PlaylistRepository {
  async findOne(id: string) {
    const playlist = await prisma.userPlaylist.findFirst({
      where: { id },
      include: playlistIncludes,
    });
    if (!playlist) return null;
    return toPlaylistDomainModel(playlist);
  }

  async findAllByUserId(userId: string) {
    const playlists = await prisma.userPlaylist.findMany({
      where: {
        userId: userId,
      },
      orderBy: { id: 'desc' },
      include: playlistIncludes,
    });
    if (!playlists) return [];
    return playlists.map((item) => toPlaylistDomainModel(item));
  }

  async create(data: RepositoryCreatePlaylistInput) {
    const { trackIds, userId, ...rest } = data;
    const bundle = await prisma.userPlaylist.create({
      data: {
        ...rest,
        userId,
        tracks: {
          connect: trackIds.map((id) => {
            return { id };
          }),
        },
      },
      include: playlistIncludes,
    });
    return toPlaylistDomainModel(bundle);
  }

  async edit(id: string, updatedField: RepositoryEditPlaylistInput) {
    const { trackIds, ...rest } = updatedField;
    if (trackIds) {
      await prisma.userPlaylist.update({
        where: { id },
        data: {
          tracks: {
            set: [],
          },
        },
      });
    }

    const updatedBundle = await prisma.userPlaylist.update({
      where: { id },
      data: {
        ...rest,
        tracks:
          trackIds && 0 < trackIds.length
            ? {
                connect: trackIds.map((id) => {
                  return { id };
                }),
              }
            : undefined,
      },
      include: playlistIncludes,
    });

    return toPlaylistDomainModel(updatedBundle);
  }

  async delete(id: string) {
    const exist = await prisma.userPlaylist.findFirst({
      where: { id },
    });

    if (!exist) {
      throw new Error('UserPlaylist가 존재하지 않습니다.');
    }
    // 연결 된 참조 끊기
    await prisma.userPlaylist.update({
      where: { id },
      data: {
        tracks: {
          set: [],
        },
      },
    });
    await prisma.userPlaylist.delete({ where: { id } });
  }
}
