import { UserPrismaRepository } from '@/modules/user/infrastructure/user.prisma.repository';
import { GenresPrismaRepository } from '../genres/infrastructure/genres.prisma.repository';
import { MoodPrismaRepository } from '../mood/infrastructure/mood.prisma.repository';
import { TrackPrismaRepository } from '../track/infrastructure/track.prisma.repository';
import { FileS3Repository } from '../upload/infrastructure/file.s3.repository';
import { StemPrismaRepository } from '../stem/infrastructure/stem.prisma.repository';

// 각 모듈이 사용할 Repository
export const repository = {
  user: new UserPrismaRepository(),
  genres: new GenresPrismaRepository(),
  mood: new MoodPrismaRepository(),
  track: new TrackPrismaRepository(),
  stem: new StemPrismaRepository(),
  file: new FileS3Repository(),
};
