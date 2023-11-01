import { UserPrismaRepository } from '@/modules/user/infrastructure/user.prisma.repository';
import { GenrePrismaRepository } from '../genre/infrastructure/genre.prisma.repository';
import { MoodPrismaRepository } from '../mood/infrastructure/mood.prisma.repository';
import { TrackPrismaRepository } from '../track/infrastructure/track.prisma.repository';
import { FileS3Repository } from '../upload/infrastructure/file.s3.repository';
import { StemPrismaRepository } from '../stem/infrastructure/stem.prisma.repository';
import { BundleTypePrismaRepository } from '../bundle/infrastructure/bundleType.prisma.repository';
import { BundlePrismaRepository } from '../bundle/infrastructure/bundle.prisma.repository';
import { PlaylistPrismaRepository } from '../playlist/infrastructure/playlist.prisma.repository';

// 각 모듈이 사용할 Repository
export const repository = {
  user: new UserPrismaRepository(),
  genre: new GenrePrismaRepository(),
  mood: new MoodPrismaRepository(),
  track: new TrackPrismaRepository(),
  stem: new StemPrismaRepository(),
  file: new FileS3Repository(),
  bundleType: new BundleTypePrismaRepository(),
  bundle: new BundlePrismaRepository(),
  playlist: new PlaylistPrismaRepository(),
};
