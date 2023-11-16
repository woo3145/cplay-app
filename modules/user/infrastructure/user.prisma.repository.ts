import { UserRepository } from '@/modules/user/domain/user.repository';
import prisma from '@/lib/db/prisma';
import bcrypt from 'bcrypt';
import { RepositoryEditUserInput } from '../domain/validations/EditUserTypes';
import { RepositoryChangePasswordInput } from '../domain/validations/ChangePasswordTypes';
import { toUserDomainModel } from './user.prisma.mapper';
import { User } from '@prisma/client';
import { handlePrismaError } from '@/lib/prismaErrorHandler';
import { NotFoundError } from '@/lib/errors';

export class UserPrismaRepository implements UserRepository {
  // User
  async findByEmail<T>(email: string, mapper: (user: User) => T): Promise<T> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundError('유저를 찾을 수 없습니다.');
      }
      return mapper(user);
    } catch (e) {
      console.error(`UserPrismaRepository: findByEmail ${email}`, e);
      throw handlePrismaError(e);
    }
  }
  async findById<T>(id: string, mapper: (user: User) => T) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundError('유저를 찾을 수 없습니다.');
      }
      return mapper(user);
    } catch (e) {
      console.error(`UserPrismaRepository: findById ${id}`, e);
      throw handlePrismaError(e);
    }
  }
  async findByEmailWithPassword<T>(email: string, mapper: (user: User) => T) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundError('유저를 찾을 수 없습니다.');
      }

      return { ...mapper(user), password: user.password };
    } catch (e) {
      console.error(
        `UserPrismaRepository: findByEmailWithPassword ${email}`,
        e
      );
      throw handlePrismaError(e);
    }
  }
  async findByIdWithPassword<T>(id: string, mapper: (user: User) => T) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundError('유저를 찾을 수 없습니다.');
      }
      return {
        ...mapper(user),
        password: user.password,
      };
    } catch (e) {
      console.error(`UserPrismaRepository: findByIdWithPassword ${id}`, e);
      throw handlePrismaError(e);
    }
  }

  async create(email: string, hashedPassword: string, name: string) {
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return toUserDomainModel(user);
    } catch (e) {
      console.error(`UserPrismaRepository: create`, e);
      throw handlePrismaError(e);
    }
  }

  async edit(userId: string, data: RepositoryEditUserInput) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data,
      });

      return toUserDomainModel(updatedUser);
    } catch (e) {
      console.error(`UserPrismaRepository: edit`, e);
      throw handlePrismaError(e);
    }
  }

  async changePassword(
    userId: string,
    { newPassword }: RepositoryChangePasswordInput
  ) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
    } catch (e) {
      console.error(`UserPrismaRepository: changePassword`, e);
      throw handlePrismaError(e);
    }
  }
}
