'use client';

import { cn } from '@/lib/utils';
import { LayoutGrid, ListMusic, Music, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mobileNavItems = [
  {
    href: '/',
    icon: <LayoutGrid className="h-4 w-4" />,
    title: '탐색',
  },
  {
    href: '/tracks',
    icon: <Music className="h-4 w-4" />,
    title: '트랙',
  },
  {
    href: '/playlists',
    icon: <ListMusic className="h-4 w-4" />,
    title: '플레이리스트',
  },
];

export const MobileNav = () => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex items-stretch h-16 border-t">
        {mobileNavItems.map((item) => {
          const isSelected = pathname === item.href;
          return (
            <li
              key={item.title}
              className="flex justify-center items-stretch w-full cursor-pointer group"
            >
              <Link
                href={item.href}
                prefetch={false}
                className={cn(
                  'flex flex-col items-center justify-center w-full gap-1 text-foreground/60 text-xs',
                  isSelected ? 'text-foreground' : 'group-hover:text-foreground'
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
