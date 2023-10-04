import { User as DomainUser, SessionUser as DomainSessionUser } from './user';
import { RepositoryChangePasswordInput } from './validations/ChangePasswordTypes';
import { RepositoryEditUserInput } from './validations/EditUserTypes';

export interface UserRepository {
  toDomainModel: (record: any) => DomainUser;
  toSessionModel: (record: any) => DomainSessionUser;

  findUserByEmail: (email: string) => Promise<DomainUser | null>;
  findUserById: (id: string) => Promise<DomainUser | null>;
  findUserByEmailWithPassword: (
    email: string
  ) => Promise<(DomainUser & { password?: string | null }) | null>;

  findSessionUserById: (id: string) => Promise<DomainSessionUser | null>;
  findSessionUserByEmail: (email: string) => Promise<DomainSessionUser | null>;
  findUserByIdWithPassword: (
    email: string
  ) => Promise<(DomainUser & { password?: string | null }) | null>;

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
