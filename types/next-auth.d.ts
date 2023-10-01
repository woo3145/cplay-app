import { Role } from '@prisma/client';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: Role;
      isSocialLogin: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: Role;
    isSocialLogin?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultUser {
    role?: Role;
    isSocialLogin?: boolean;
  }
}
