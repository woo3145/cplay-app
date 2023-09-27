'use client';

import { cn } from '@/lib/utils';
import { Role } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const topNavigations = [
  {
    href: '/',
    name: '🏚️ 홈',
  },
  {
    href: '/sounds',
    name: '🎸 트랙',
  },
  {
    href: '/community',
    name: '👨‍👨‍👧‍👦 커뮤니티',
  },
];

const userNavigations = (userId: string) => {
  return [
    {
      href: `/studio/${userId}`,
      name: '🎹 내 스튜디오',
    },
    {
      href: '/my/library',
      name: '🗂️ 라이브러리',
    },
  ];
};

export const SideBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="w-full overflow-y-auto border-r border-border font-semibold tracking-widest">
      {session?.user.role === Role.ADMIN ? (
        <div className="py-4 border-b border-border pt-4">
          <ul className="text-sm">
            <li>
              <Link
                href={'/admin'}
                className={cn(
                  'flex items-center w-full px-4 py-2.5 cursor-pointer',
                  'hover:bg-accent rounded-lg'
                )}
              >
                🚪 어드민 페이지
              </Link>
            </li>
          </ul>
        </div>
      ) : null}

      <div className="py-4">
        <ul className="text-sm">
          {topNavigations.map((nav) => {
            const isActive = pathname === nav.href;
            return (
              <li key={nav.name}>
                <Link
                  href={nav.href}
                  className={cn(
                    'flex items-center w-full px-4 py-2.5 cursor-pointer',
                    isActive
                      ? 'border-l-4 border-primary bg-accent'
                      : 'hover:bg-accent transition-colors duration-200'
                  )}
                >
                  {nav.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {session && (
        <div className="mb-4 border-t border-border pt-4">
          <p className="px-4 mb-2 text-xs text-foreground/80">마이페이지</p>
          <ul className="text-sm">
            {userNavigations(session.user.id).map((nav) => {
              const isActive = pathname === nav.href;
              return (
                <li key={nav.name}>
                  <Link
                    href={nav.href}
                    className={cn(
                      'flex items-center w-full px-4 py-2.5 cursor-pointer',
                      isActive
                        ? 'border-l-4 border-primary bg-accent'
                        : 'hover:bg-accent rounded-lg'
                    )}
                  >
                    {nav.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
