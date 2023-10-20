import {
  UserRepository,
  UserType,
  isSessionType,
} from '@/modules/user/domain/user.repository';
import prisma from '@/lib/db/prisma';
import bcrypt from 'bcrypt';
import {
  User as DomainUser,
  SessionUser as DomainSessionUser,
} from '../domain/user';
import { RepositoryEditUserInput } from '../domain/validations/EditUserTypes';
import { RepositoryChangePasswordInput } from '../domain/validations/ChangePasswordTypes';
import {
  toSessionUserDomainModel,
  toUserDomainModel,
} from './user.prisma.mapper';

export class UserPrismaRepository implements UserRepository {
  // User
  async findByEmail<T extends UserType>(
    email: string,
    type: T
  ): Promise<(T extends 'session' ? DomainSessionUser : DomainUser) | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    // 동적 타입 check
    return (
      isSessionType(type)
        ? toSessionUserDomainModel(user)
        : toUserDomainModel(user)
    ) as T extends 'session' ? DomainSessionUser : DomainUser;
  }
  async findById<T extends UserType>(id: string, type: T) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    // 동적 타입 check
    return (
      isSessionType(type)
        ? toSessionUserDomainModel(user)
        : toUserDomainModel(user)
    ) as T extends 'session' ? DomainSessionUser : DomainUser;
  }
  async findByEmailWithPassword<T extends UserType>(email: string, type: T) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return {
      ...(isSessionType(type)
        ? toSessionUserDomainModel(user)
        : toUserDomainModel(user)),
      password: user.password,
    } as T extends 'session'
      ? DomainSessionUser & { password?: string | null }
      : DomainUser & { password?: string | null };
  }
  async findByIdWithPassword<T extends UserType>(id: string, type: T) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    return {
      ...(isSessionType(type)
        ? toSessionUserDomainModel(user)
        : toUserDomainModel(user)),
      password: user.password,
    } as T extends 'session'
      ? DomainSessionUser & { password?: string | null }
      : DomainUser & { password?: string | null };
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
