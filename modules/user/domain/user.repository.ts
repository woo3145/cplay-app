import { User as DomainUser } from './user';
import { EditUserFormData } from './user.validation';

export interface UserRepository {
  getUserByEmail: (email: string) => Promise<DomainUser | null>;
  getUserByEmailWithPassword: (
    email: string
  ) => Promise<(DomainUser & { password?: string | null }) | null>;

  create: (
    email: string,
    password: string,
    name: string
  ) => Promise<DomainUser>;

  edit: (userId: string, data: EditUserFormData) => Promise<DomainUser>;
}
