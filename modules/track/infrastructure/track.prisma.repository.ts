import prisma from '@/lib/db/prisma';
import { TrackRepository } from '../domain/track.repository';
import { RepositoryCreateTrackInput } from '../domain/validations/CreateTrackTypes';
import { RepositoryEditTrackInput } from '../domain/validations/EditTrackTypes';
import { RepositoryGetTracksQuery } from '../domain/validations/GetTrackTypes';
import { toTrackDomainModel } from './track.prisma.mapper';
import { handlePrismaError } from '@/lib/prismaErrorHandler';
import { NotFoundError } from '@/lib/errors';

export const trackIncludes = {
  creator: true,
  moods: true,
  genres: true,
  stems: true,
};

export class TrackPrismaRepository implements TrackRepository {
  async findById(id: number) {
    try {
      const track = await prisma.track.findFirst({
        where: { id },
        include: trackIncludes,
      });
      if (!track) {
        throw new NotFoundError(`${id}에 해당하는 트랙을 찾을 수 없습니다.`);
      }

      return toTrackDomainModel(track);
    } catch (e) {
      console.error(`TrackPrismaRepository: findById ${id}`, e);
      throw handlePrismaError(e);
    }
  }
  async findAll(query?: RepositoryGetTracksQuery, isAdmin: boolean = false) {
    try {
      const { page = 1, take = 10, genres, moods, title } = query || {};
      const offset = (page - 1) * take;

      const pagination = {
        skip: isAdmin ? undefined : offset,
        take: isAdmin ? undefined : take,
      };

      let whereCondition: any = {};

      if (!isAdmin) {
        whereCondition.status = 'PUBLISH';
      }

      if (genres?.length) {
        whereCondition.AND = genres.map((id) => ({
          genres: {
            some: {
              id: id,
            },
          },
        }));
      }

      if (moods?.length) {
        const moodConditions = moods.map((id) => ({
          moods: {
            some: {
              id: id,
            },
          },
        }));

        whereCondition.AND = whereCondition.AND
          ? [...whereCondition.AND, ...moodConditions]
          : moodConditions;
      }

      if (title) {
        whereCondition.title = { contains: title, mode: 'insensitive' };
      }

      const tracks = await prisma.track.findMany({
        where: whereCondition,
        orderBy: {
          id: 'desc',
        },
        include: trackIncludes,
        ...pagination,
      });

      const totalCount = await prisma.track.count({ where: whereCondition });

      return {
        tracks: tracks.map((track) => toTrackDomainModel(track)),
        totalCount,
      };
    } catch (e) {
      console.error(`TrackPrismaRepository: findAll`, e);
      throw handlePrismaError(e);
    }
  }

  async create(data: RepositoryCreateTrackInput) {
    try {
      const { creatorId, moodIds, genreIds, ...rest } = data;
      const track = await prisma.track.create({
        data: {
          ...rest,
          genres: {
            connect: genreIds.map((id) => ({ id })),
          },
          moods: {
            connect: moodIds.map((id) => ({ id })),
          },
          creator: {
            connect: { id: creatorId },
          },
        },
        include: trackIncludes,
      });

      return toTrackDomainModel(track);
    } catch (e) {
      console.error(`TrackPrismaRepository: create`, e);
      throw handlePrismaError(e);
    }
  }
  async edit(id: number, data: RepositoryEditTrackInput) {
    try {
      const { moodIds, genreIds, creatorId, ...rest } = data;
      const updatedTrack = await prisma.track.update({
        where: { id },
        data: {
          ...rest,
          ...(moodIds && { moods: { set: moodIds.map((id) => ({ id })) } }),
          ...(genreIds && { genres: { set: genreIds.map((id) => ({ id })) } }),
          ...(creatorId && { creator: { connect: { id: creatorId } } }),
        },
        include: trackIncludes,
      });

      return toTrackDomainModel(updatedTrack);
    } catch (e) {
      console.error(`TrackPrismaRepository: edit`, e);
      throw handlePrismaError(e);
    }
  }

  async delete(id: number) {
    try {
      const exist = await prisma.track.findUniqueOrThrow({
        where: { id },
        include: trackIncludes,
      });

      await prisma.track.delete({ where: { id } });
      return toTrackDomainModel(exist);
    } catch (e) {
      console.error(`TrackPrismaRepository: delete`, e);
      throw handlePrismaError(e);
    }
  }

  async isTrackLikedByUser(userId: string, trackId: number) {
    try {
      const likedRecord = await prisma.trackLike.findFirst({
        where: {
          userId,
          trackId,
        },
      });
      return likedRecord !== null;
    } catch (e) {
      console.error(`TrackPrismaRepository: isTrackLikedByUser`, e);
      throw handlePrismaError(e);
    }
  }

  async likeTrack(userId: string, trackId: number) {
    try {
      const likedTrack = await prisma.trackLike.create({
        data: {
          userId,
          trackId,
        },
      });

      return likedTrack;
    } catch (e) {
      console.error(`TrackPrismaRepository: likeTrack`, e);
      throw handlePrismaError(e);
    }
  }

  async unlikeTrack(userId: string, trackId: number) {
    try {
      const { count } = await prisma.trackLike.deleteMany({
        where: {
          userId,
          trackId,
        },
      });

      if (count === 0) {
        throw new NotFoundError();
      }
    } catch (e) {
      console.error(`TrackPrismaRepository: unlikeTrack`, e);
      throw handlePrismaError(e);
    }
  }

  async getLikedTracksByUser(userId: string) {
    try {
      const likedTracks = await prisma.trackLike.findMany({
        where: {
          userId,
        },
        include: {
          track: {
            include: trackIncludes,
          },
        },
      });

      return likedTracks.map((like) => toTrackDomainModel(like.track));
    } catch (e) {
      console.error(`TrackPrismaRepository: getLikedTracksByUser`, e);
      throw handlePrismaError(e);
    }
  }
}
