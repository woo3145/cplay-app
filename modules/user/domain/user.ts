export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface SessionUser extends User {
  role: UserRole;
  isSocialLogin: boolean;
}
