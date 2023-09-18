'use client';

import { useSession } from 'next-auth/react';

export default function AdminPage() {
  const session = useSession();
  return (
    <div className="flex flex-col items-center justify-between bg-slate-200">
      <div>어드민 페이지</div>
    </div>
  );
}
