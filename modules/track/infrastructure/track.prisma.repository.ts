import prisma from '@/lib/db/prisma';
import { TrackRepository } from '../domain/track.repository';
import { Genre, Mood, Track as PrismaTrack, Stem, User } from '@prisma/client';
import { RepositoryCreateTrackInput } from '../domain/validations/CreateTrackTypes';
import { TrackStatus } from '../domain/track';
import { RepositoryEditTrackInput } from '../domain/validations/EditTrackTypes';

export class TrackPrismaRepository implements TrackRepository {
  toDomainModel(
    record: PrismaTrack & {
      moods: Mood[];
      genres: Genre[];
      stems: Stem[];
      creator: User | null;
    }
  ) {
    return {
      id: record.id,
      title: record.title,
      imageUrl: record.imageUrl,
      length: record.length, // 트랙 길이 (초)
      bpm: record.bpm, // 트랙 템포
      status: record.status as TrackStatus, // 트랙 릴리즈 여부
      createdAt: record.createdAt, // 트랙 추가일
      releaseDate: record.releaseDate, // 트랙 공개일

      genres: record.genres.map((item) => {
        return { id: item.id, tag: item.tag, slug: item.slug };
      }),
      moods: record.moods.map((item) => {
        return { id: item.id, tag: item.tag };
      }),
      stems: record.stems.map((item) => {
        return { id: item.id, stemType: item.stemType, src: item.src };
      }),
      creator: record.creator
        ? {
            id: record.creator.id,
            name: record.creator.name ?? '',
            image: record.creator.image ?? '',
          }
        : null,
    };
  }
  async findById(id: number) {
    const track = await prisma.track.findFirst({
      where: { id },
      include: {
        creator: true,
        moods: true,
        genres: true,
        stems: true,
      },
    });
    if (!track) return null;

    return this.toDomainModel(track);
  }
  async findAll() {
    const tracks = await prisma.track.findMany({
      include: {
        creator: true,
        moods: true,
        genres: true,
        stems: true,
      },
    });
    if (!tracks) return [];

    return tracks.map((track) => this.toDomainModel(track));
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
      include: {
        genres: true,
        moods: true,
        creator: true,
        stems: true,
      },
    });

    return this.toDomainModel(track);
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
      include: {
        genres: true,
        moods: true,
        creator: true,
        stems: true,
      },
    });

    return this.toDomainModel(updatedTrack);
  }

  async delete(id: number) {
    const exist = await prisma.track.findFirst({ where: { id } });
    if (!exist) {
      throw new Error('Track이 존재하지 않습니다.');
    }

    await prisma.track.delete({ where: { id } });
  }
}
