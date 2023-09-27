'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigations = [
  {
    href: '/',
    name: 'Home',
  },
  {
    href: '/sounds',
    name: 'Sounds',
  },
  {
    href: '/community',
    name: 'Community',
  },
];

export const HeaderNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-auto items-center gap-2">
      {navigations.map((nav) => {
        const isActive = pathname === nav.href;
        return (
          <Link
            key={nav.name}
            href={nav.href}
            className={cn(
              'px-2 transition-colors text-foreground/60 hover:text-foreground',
              isActive && 'text-foreground'
            )}
          >
            {nav.name}
          </Link>
        );
      })}
    </nav>
  );
};
