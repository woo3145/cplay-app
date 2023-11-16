import { User as DomainUser } from './user';
import { RepositoryChangePasswordInput } from './validations/ChangePasswordTypes';
import { RepositoryEditUserInput } from './validations/EditUserTypes';

export interface UserRepository {
  findByEmail: <T>(email: string, mapper: (user: any) => T) => Promise<T>;
  findById: <T>(id: string, mapper: (user: any) => T) => Promise<T>;
  findByEmailWithPassword: <T>(
    email: string,
    mapper: (user: any) => T
  ) => Promise<T & { password?: string | null }>;
  findByIdWithPassword: <T>(
    email: string,
    mapper: (user: any) => T
  ) => Promise<T & { password?: string | null }>;

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
