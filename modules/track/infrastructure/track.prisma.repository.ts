import prisma from '@/lib/db/prisma';
import { revalidateTag, unstable_cache } from 'next/cache';
import { CreateTrackInput, TrackRepository } from '../domain/track.repository';

export class TrackPrismaRepository implements TrackRepository {
  async findAll() {
    const tracks = await unstable_cache(
      async () => {
        const data = await prisma.track.findMany({
          include: {
            creator: true,
            moods: true,
            genres: true,
            stems: true,
          },
        });
        console.log('Prisma 호출 : Tracks');
        return data;
      },
      ['allTracks'],
      { tags: ['allTracks'], revalidate: 3600 }
    )();
    if (!tracks) return [];

    return tracks;
  }

  async create(data: CreateTrackInput) {
    const { creatorId, moodIds, genresIds, ...rest } = data;
    const track = await prisma.track.create({
      data: {
        ...rest,
        createdAt: new Date(),
        genres: {
          connect: genresIds.map((id) => {
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
    revalidateTag('allTracks');

    return track;
  }
  async delete(id: number) {
    const exist = await prisma.track.findFirst({ where: { id } });
    if (!exist) {
      throw new Error('Track이 존재하지 않습니다.');
    }

    await prisma.track.delete({ where: { id } });

    revalidateTag('allTracks');
  }
}
