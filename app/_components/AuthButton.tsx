'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>{session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <p>로그인이 필요합니다.</p>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};
