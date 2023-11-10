import prisma from '@/lib/db/prisma';
import { TrackRepository } from '../domain/track.repository';
import { RepositoryCreateTrackInput } from '../domain/validations/CreateTrackTypes';
import { RepositoryEditTrackInput } from '../domain/validations/EditTrackTypes';
import { RepositoryGetTracksQuery } from '../domain/validations/GetTrackTypes';
import { toTrackDomainModel } from './track.prisma.mapper';

export const trackIncludes = {
  creator: true,
  moods: true,
  genres: true,
  stems: true,
};

export class TrackPrismaRepository implements TrackRepository {
  async findById(id: number) {
    const track = await prisma.track.findFirst({
      where: { id },
      include: trackIncludes,
    });
    if (!track) return null;

    return toTrackDomainModel(track);
  }
  async findAll() {
    const tracks = await prisma.track.findMany({
      include: trackIncludes,
      orderBy: {
        id: 'desc',
      },
    });
    if (!tracks) return [];

    return tracks.map((track) => toTrackDomainModel(track));
  }

  async countTracksWithQuery(query: RepositoryGetTracksQuery) {
    const { genre, mood, title } = query;

    let whereCondition: any = {};

    if (genre) {
      whereCondition.genres = { some: { slug: genre } };
    }

    if (mood) {
      whereCondition.moods = { some: { tag: mood } };
    }

    if (title) {
      whereCondition.title = { contains: title, mode: 'insensitive' };
    }

    const count = await prisma.track.count({
      where: { ...whereCondition, status: 'PUBLISH' },
    });

    return count;
  }

  async findAllWithQuery(query: RepositoryGetTracksQuery) {
    const { page = 1, take = 10, genre, mood, title } = query;
    const offset = (page - 1) * 10;

    let whereCondition: any = {};

    if (genre) {
      whereCondition.genres = {
        some: {
          slug: genre,
        },
      };
    }

    if (mood) {
      whereCondition.moods = {
        some: {
          tag: mood,
        },
      };
    }

    if (title) {
      whereCondition.title = { contains: title, mode: 'insensitive' };
    }

    const tracks = await prisma.track.findMany({
      where: {
        ...whereCondition,
        status: 'PUBLISH',
      },
      orderBy: {
        id: 'desc',
      },
      include: trackIncludes,
      skip: offset,
      take: take,
    });

    return tracks.map((track) => toTrackDomainModel(track));
  }

  async create(data: RepositoryCreateTrackInput) {
    const { creatorId, moodIds, genreIds, ...rest } = data;
    const track = await prisma.track.create({
      data: {
        ...rest,
        createdAt: new Date(),
        genres: {
          connect: genreIds.map((id) => {
            return { id: id };
          }),
        },
        moods: {
          connect: moodIds.map((id) => {
            return { id: id };
          }),
        },
        creator: {
          connect: {
            id: creatorId,
          },
        },
      },
      include: trackIncludes,
    });

    return toTrackDomainModel(track);
  }
  async edit(id: number, data: RepositoryEditTrackInput) {
    const { moodIds, genreIds, creatorId, ...rest } = data;
    const updatedTrack = await prisma.track.update({
      where: { id },
      data: {
        ...rest,
        moods: moodIds ? { set: moodIds.map((id) => ({ id })) } : undefined,
        genres: genreIds ? { set: genreIds.map((id) => ({ id })) } : undefined,
        creator: creatorId ? { connect: { id: creatorId } } : undefined,
      },
      include: trackIncludes,
    });

    return toTrackDomainModel(updatedTrack);
  }

  async delete(id: number) {
    const exist = await prisma.track.findFirst({
      where: { id },
      include: trackIncludes,
    });
    if (!exist) {
      throw new Error('Track이 존재하지 않습니다.');
    }

    await prisma.track.delete({ where: { id } });
    return toTrackDomainModel(exist);
  }

  async likeTrack(userId: string, trackId: number) {
    const likedTrack = await prisma.trackLike.create({
      data: {
        userId,
        trackId,
      },
    });

    return likedTrack;
  }

  async unlikeTrack(userId: string, trackId: number) {
    const deletedTrack = await prisma.trackLike.delete({
      where: {
        userId_trackId: {
          userId,
          trackId,
        },
      },
    });

    return deletedTrack;
  }

  async getLikedTracksByUser(userId: string) {
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
  }
}
