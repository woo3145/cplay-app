import { UserPrismaRepository } from '@/modules/user/infrastructure/user.prisma.repository';
import { GenresPrismaRepository } from '../genres/infrastructure/genres.prisma.repository';

// 각 모듈이 사용할 Repository
export const repository = {
  user: new UserPrismaRepository(),
  genres: new GenresPrismaRepository(),
};
