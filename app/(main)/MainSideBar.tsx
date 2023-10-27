'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Role } from '@prisma/client';
import { DoorOpen, ListMusic, PlusSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserPlaylists } from '@/components/playlist/UserPlaylists';

interface MainSideBarProps extends React.HTMLAttributes<HTMLElement> {
  mainNavItems: {
    href: string;
    icon: React.ReactNode;
    title: string;
  }[];
  userNavItems: {
    href: string;
    icon: React.ReactNode;
    title: string;
  }[];
}

export function MainSideBar({
  className,
  mainNavItems,
  userNavItems,
}: MainSideBarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-2 py-4">
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
            {mainNavItems.map((nav) => {
              const isActive = pathname === nav.href;
              return (
                <Link key={nav.title} href={nav.href} prefetch={false}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start',
                      isActive && 'bg-accent text-accent-foreground'
                    )}
                  >
                    {nav.icon}
                    {nav.title}
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
              {userNavItems.map((nav) => {
                return (
                  <Link key={nav.title} href={nav.href} prefetch={false}>
                    <Button variant="ghost" className="w-full justify-start">
                      {nav.icon}
                      {nav.title}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
        {session?.user ? (
          <div className="py-2">
            <h2 className="relative px-7 text-lg font-semibold tracking-tight">
              Playlists
            </h2>
            <UserPlaylists />
          </div>
        ) : null}
      </div>
    </div>
  );
}
