'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export const UserMenu = () => {
  const { data: session } = useSession();

  return session ? (
    <div onClick={() => signOut()}>{session.user.name}</div>
  ) : (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        className="px-4 py-1.5 text-foreground/60 hover:text-foreground"
      >
        로그인
      </Link>
      <Link
        href="/register"
        className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full"
      >
        회원가입
      </Link>
    </div>
  );
};
