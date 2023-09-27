'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Role } from '@prisma/client';
import {
  DoorOpen,
  Heart,
  LayoutGrid,
  Library,
  Monitor,
  Music,
  Users,
} from 'lucide-react';

const discoverNavigations = [
  {
    href: '/',
    icon: <LayoutGrid className="mr-2 h-4 w-4" />,
    name: '탐색',
  },
  {
    href: '/sounds',
    icon: <Music className="mr-2 h-4 w-4" />,
    name: '트랙',
  },
  {
    href: '/community',
    icon: <Users className="mr-2 h-4 w-4" />,
    name: '커뮤니티',
  },
];

const userNavigations = (userId: string) => {
  return [
    {
      href: `/studio/${userId}`,
      icon: <Monitor className="mr-2 h-4 w-4" />,
      name: '내 스튜디오',
    },
    {
      href: '/my/library',
      icon: <Library className="mr-2 h-4 w-4" />,
      name: '라이브러리',
    },
    {
      href: '/',
      icon: <Heart className="mr-2 h-4 w-4" />,
      name: '찜목록',
    },
  ];
};

interface SidebarProps {
  className?: string;
}

export function SideBar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        {session?.user.role === Role.ADMIN && (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Admin
            </h2>
            <div className="space-y-1">
              <Link href="/admin" prefetch={false}>
                <Button variant="ghost" className="w-full justify-start">
                  <DoorOpen className="mr-2 h-4 w-4" />
                  어드민 페이지
                </Button>
              </Link>
            </div>
          </div>
        )}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>

          <div className="space-y-1">
            {discoverNavigations.map((nav) => {
              const isActive = pathname === nav.href;
              return (
                <Link href={nav.href} prefetch={false}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start',
                      isActive && 'bg-accent text-accent-foreground'
                    )}
                  >
                    {nav.icon}
                    {nav.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
        {session?.user ? (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              User
            </h2>
            <div className="space-y-1">
              {userNavigations(session.user.id).map((nav) => {
                return (
                  <Link href={nav.href} prefetch={false}>
                    <Button variant="ghost" className="w-full justify-start">
                      {nav.icon}
                      {nav.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
