import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { AuthOptions, DefaultSession, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '@/prisma';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: Role.USER,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials, req) {
        // 입력값 유효성 확인
        if (!credentials?.email) {
          throw new Error('이메일은 필수 입력 사항입니다.');
        }
        if (!credentials?.password) {
          throw new Error('패스워드는 필수 입력 사항입니다.');
        }

        // 유저 찾기
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // 사용자 존재여부 확인
        if (!user) {
          throw new Error('이메일 또는 패스워드가 잘못되었습니다.');
        }

        // 간편 로그인 여부 확인
        if (user.password === null) {
          throw new Error('간편 로그인된 계정이 존재합니다.');
        }

        // 비밀번호 일치 여부 확인
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error('이메일 또는 패스워드가 잘못되었습니다.');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.user.role = token.role as string;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
