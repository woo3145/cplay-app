import { UserRepository } from '@/modules/user/domain/user.repository';
import prisma from '@/lib/db/prisma';
import bcrypt from 'bcrypt';
import { RepositoryEditUserInput } from '../domain/validations/EditUserTypes';
import { RepositoryChangePasswordInput } from '../domain/validations/ChangePasswordTypes';
import { toUserDomainModel } from './user.prisma.mapper';
import { User } from '@prisma/client';

export class UserPrismaRepository implements UserRepository {
  // User
  async findByEmail<T>(
    email: string,
    mapper: (user: User) => T
  ): Promise<T | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return mapper(user);
  }
  async findById<T>(id: string, mapper: (user: User) => T) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    return mapper(user);
  }
  async findByEmailWithPassword<T>(email: string, mapper: (user: User) => T) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return { ...mapper(user), password: user.password };
  }
  async findByIdWithPassword<T>(id: string, mapper: (user: User) => T) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    return {
      ...mapper(user),
      password: user.password,
    };
  }

  async create(email: string, hashedPassword: string, name: string) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return toUserDomainModel(user);
  }

  async edit(userId: string, data: RepositoryEditUserInput) {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return toUserDomainModel(updatedUser);
  }

  async changePassword(
    userId: string,
    { newPassword }: RepositoryChangePasswordInput
  ) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }
}
