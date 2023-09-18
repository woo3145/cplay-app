import { User as DomainUser } from './user';

export interface UserRepository {
  getUserByEmail: (email: string) => Promise<DomainUser | null>;
  getUserByEmailWithPassword: (
    email: string
  ) => Promise<(DomainUser & { password?: string | null }) | null>;

  createUser: (
    email: string,
    password: string,
    name: string
  ) => Promise<DomainUser>;
}
