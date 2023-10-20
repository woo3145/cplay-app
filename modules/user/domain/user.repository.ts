import { User as DomainUser, SessionUser as DomainSessionUser } from './user';
import { RepositoryChangePasswordInput } from './validations/ChangePasswordTypes';
import { RepositoryEditUserInput } from './validations/EditUserTypes';

export type UserType = 'user' | 'session';

export const isSessionType = (type: UserType): type is 'session' => {
  return type === 'session';
};

export interface UserRepository {
  findByEmail: <T extends UserType>(
    email: string,
    type: T
  ) => Promise<(T extends 'session' ? DomainSessionUser : DomainUser) | null>;
  findById: <T extends UserType>(
    id: string,
    type: T
  ) => Promise<(T extends 'session' ? DomainSessionUser : DomainUser) | null>;
  findByEmailWithPassword: <T extends UserType>(
    email: string,
    type: T
  ) => Promise<
    | (T extends 'session'
        ? DomainSessionUser & { password?: string | null }
        : DomainUser & { password?: string | null })
    | null
  >;
  findByIdWithPassword: <T extends UserType>(
    email: string,
    type: T
  ) => Promise<
    | (T extends 'session'
        ? DomainSessionUser & { password?: string | null }
        : DomainUser & { password?: string | null })
    | null
  >;
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
