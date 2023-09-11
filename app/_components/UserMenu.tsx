'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Skeleton } from './atoms/Skeleton';
import { Avatar } from './atoms/Avatar';

export const UserMenu = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Skeleton className="w-9 h-9 rounded-full" />;
  }

  return session ? (
    <Avatar
      src={session.user.image}
      circle
      onClick={() => signOut()}
      className="w-9 h-9 cursor-pointer"
    />
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
