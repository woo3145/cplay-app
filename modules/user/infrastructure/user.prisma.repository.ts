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
  UserRole,
} from '../domain/user';
import { User as PrismaUser } from '@prisma/client';
import { RepositoryEditUserInput } from '../domain/validations/EditUserTypes';
import { RepositoryChangePasswordInput } from '../domain/validations/ChangePasswordTypes';

export class UserPrismaRepository implements UserRepository {
  toDomainModel(record: PrismaUser): DomainUser {
    return {
      id: record.id,
      name: record.name ?? '',
      email: record.email ?? '',
      image: record.image ?? '',
    };
  }

  toSessionModel(record: PrismaUser): DomainSessionUser {
    return {
      ...this.toDomainModel(record),
      role: record.role as UserRole,
      isSocialLogin: !record.password,
    };
  }

  // User
  async findByEmail<T extends UserType>(
    email: string,
    type: T
  ): Promise<(T extends 'session' ? DomainSessionUser : DomainUser) | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    // 동적 타입 check
    return (
      isSessionType(type) ? this.toSessionModel(user) : this.toDomainModel(user)
    ) as T extends 'session' ? DomainSessionUser : DomainUser;
  }
  async findById<T extends UserType>(id: string, type: T) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    // 동적 타입 check
    return (
      isSessionType(type) ? this.toSessionModel(user) : this.toDomainModel(user)
    ) as T extends 'session' ? DomainSessionUser : DomainUser;
  }
  async findByEmailWithPassword<T extends UserType>(email: string, type: T) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return {
      ...(isSessionType(type)
        ? this.toSessionModel(user)
        : this.toDomainModel(user)),
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
        ? this.toSessionModel(user)
        : this.toDomainModel(user)),
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

    return this.toDomainModel(user);
  }

  async edit(userId: string, data: RepositoryEditUserInput) {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return this.toDomainModel(updatedUser);
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
