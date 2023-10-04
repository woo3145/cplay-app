import { UserRepository } from '@/modules/user/domain/user.repository';
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
  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return this.toDomainModel(user);
  }
  async findUserById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return this.toDomainModel(user);
  }
  async findUserByEmailWithPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return {
      ...this.toDomainModel(user),
      password: user.password,
    };
  }
  // SessionUser
  async findSessionUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return this.toSessionModel(user);
  }
  async findSessionUserById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return this.toSessionModel(user);
  }
  async findUserByIdWithPassword(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return {
      ...this.toDomainModel(user),
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
