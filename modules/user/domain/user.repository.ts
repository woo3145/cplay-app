import { User as DomainUser } from './user';
import { RepositoryChangePasswordInput } from './validations/ChangePasswordTypes';
import { RepositoryEditUserInput } from './validations/EditUserTypes';

export interface UserRepository {
  findByEmail: <T>(
    email: string,
    mapper: (user: any) => T
  ) => Promise<T | null>;
  findById: <T>(id: string, mapper: (user: any) => T) => Promise<T | null>;
  findByEmailWithPassword: <T>(
    email: string,
    mapper: (user: any) => T
  ) => Promise<(T & { password?: string | null }) | null>;
  findByIdWithPassword: <T>(
    email: string,
    mapper: (user: any) => T
  ) => Promise<(T & { password?: string | null }) | null>;

  create: (
    email: string,
    password: string,
    name: string
  ) => Promise<DomainUser>;

  edit: (userId: string, data: RepositoryEditUserInput) => Promise<DomainUser>;

  changePassword: (
    userId: string,
    data: RepositoryChangePasswordInput
  ) => Promise<void>;
}
