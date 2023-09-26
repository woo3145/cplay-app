import { UserPrismaRepository } from '@/modules/user/infrastructure/user.prisma.repository';
import { GenresPrismaRepository } from '../genres/infrastructure/genres.prisma.repository';
import { MoodPrismaRepository } from '../mood/infrastructure/mood.prisma.repository';
import { CreatorPrismaRepository } from '../creator/infrastructure/creator.prisma.repository';
import { TrackPrismaRepository } from '../track/infrastructure/track.prisma.repository';

// 각 모듈이 사용할 Repository
export const repository = {
  user: new UserPrismaRepository(),
  genres: new GenresPrismaRepository(),
  mood: new MoodPrismaRepository(),
  creator: new CreatorPrismaRepository(),
  track: new TrackPrismaRepository(),
};
