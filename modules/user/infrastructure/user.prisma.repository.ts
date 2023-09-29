import { UserRepository } from '@/modules/user/domain/user.repository';
import prisma from '@/lib/db/prisma';
import { EditUserFormData } from '../domain/user.validation';

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

  async create(email: string, hashedPassword: string, name: string) {
    const user = prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }

  async edit(userId: string, { name, imageUrl }: EditUserFormData) {
    const exist = await prisma.user.findUnique({ where: { id: userId } });

    if (!exist) {
      throw new Error('User가 존재하지 않습니다.');
    }

    const updatedField = {
      name: exist.name === name ? undefined : name,
      image: exist.image === imageUrl ? undefined : imageUrl,
    };

    // 모든 필드가 undefined라면 기존 user 반환
    if (Object.values(updatedField).every((val) => val === undefined)) {
      return exist;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedField,
    });

    return updatedUser;
  }
}
