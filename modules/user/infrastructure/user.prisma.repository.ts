import { UserRepository } from '@/modules/user/domain/user.repository';
import prisma from '@/lib/db/prisma';

export class UserPrismaRepository implements UserRepository {
  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    };
  }
  async getUserByEmailWithPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image,
      role: user.role,
    };
  }

  async createUser(email: string, hashedPassword: string, name: string) {
    const user = prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }
}
