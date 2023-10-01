import { User as DomainUser } from './user';
import { EditUserFormData } from './user.validation';

export interface UserRepository {
  findByEmail: (email: string) => Promise<DomainUser | null>;
  findByEmailWithPassword: (
    email: string
  ) => Promise<(DomainUser & { password?: string | null }) | null>;
  findByIdWithPassword: (
    id: string
  ) => Promise<(DomainUser & { password?: string | null }) | null>;

  create: (
    email: string,
    password: string,
    name: string
  ) => Promise<DomainUser>;

  edit: (userId: string, data: EditUserFormData) => Promise<DomainUser>;

  changePassword: (userId: string, newPassword: string) => Promise<void>;
}
