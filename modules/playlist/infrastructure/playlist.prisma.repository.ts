import prisma from '@/lib/db/prisma';
import { trackIncludes } from '@/modules/track/infrastructure/track.prisma.repository';
import { TrackStatus } from '@/modules/track/domain/track';
import { PlaylistRepository } from '../domain/playlist.repository';
import { toPlaylistDomainModel } from './playlist.prisma.mapper';
import { RepositoryCreatePlaylistInput } from '../domain/validations/CreatePlaylistTypes';
import { RepositoryEditPlaylistInput } from '../domain/validations/EditPlaylistTypes';
import { handlePrismaError } from '@/lib/prismaErrorHandler';
import { NotFoundError } from '@/lib/errors';

export const playlistIncludes = {
  tracks: {
    where: {
      status: TrackStatus.PUBLISH,
    },
    include: trackIncludes,
  },
};

export class PlaylistPrismaRepository implements PlaylistRepository {
  async findById(id: string) {
    try {
      const playlist = await prisma.userPlaylist.findFirst({
        where: { id },
        include: playlistIncludes,
      });
      if (!playlist) {
        throw new NotFoundError(
          `${id}에 해당하는 플레이리스트를 찾을 수 없습니다.`
        );
      }
      return toPlaylistDomainModel(playlist);
    } catch (e) {
      console.error(`PlaylistPrismaRepository: findById ${id}`, e);
      throw handlePrismaError(e);
    }
  }

  async findAllByUserId(userId: string) {
    try {
      const playlists = await prisma.userPlaylist.findMany({
        where: {
          userId: userId,
        },
        orderBy: { id: 'desc' },
        include: playlistIncludes,
      });
      return playlists.map((item) => toPlaylistDomainModel(item));
    } catch (e) {
      console.error(`PlaylistPrismaRepository: findAllByUserId ${userId}`, e);
      throw handlePrismaError(e);
    }
  }

  async create(data: RepositoryCreatePlaylistInput) {
    try {
      const { trackIds, userId, ...rest } = data;
      const playlist = await prisma.userPlaylist.create({
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
      return toPlaylistDomainModel(playlist);
    } catch (e) {
      console.error(`PlaylistPrismaRepository: create`, e);
      throw handlePrismaError(e);
    }
  }

  async edit(id: string, updatedField: RepositoryEditPlaylistInput) {
    try {
      const { trackIds, ...rest } = updatedField;

      const updatedPlaylist = await prisma.userPlaylist.update({
        where: { id },
        data: {
          ...rest,
          ...(trackIds && { tracks: { set: trackIds.map((id) => ({ id })) } }),
        },
        include: playlistIncludes,
      });

      return toPlaylistDomainModel(updatedPlaylist);
    } catch (e) {
      console.error(`PlaylistPrismaRepository: edit`, e);
      throw handlePrismaError(e);
    }
  }

  async delete(id: string) {
    try {
      const exist = await prisma.userPlaylist.findFirst({
        where: { id },
      });

      if (!exist) {
        throw new NotFoundError();
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
    } catch (e) {
      console.error(`PlaylistPrismaRepository: delete`, e);
      throw handlePrismaError(e);
    }
  }
}
