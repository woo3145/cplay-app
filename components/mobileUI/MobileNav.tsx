'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props extends React.HTMLAttributes<HTMLElement> {
  mainNavItems: {
    href: string;
    icon: React.ReactNode;
    title: string;
  }[];
}

export const MobileNav = ({ mainNavItems }: Props) => {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 w-full z-50 bg-foreground h-16 sm:h-20 lg-hidden">
      <ul className="flex justify-around items-center h-16 sm:h-20">
        {mainNavItems.map((item) => {
          const isSelected = pathname === item.href;
          return (
            <li key={item.title}>
              <Link
                href={item.href}
                prefetch={false}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 text-background/60 text-xs sm:text-sm cursor-pointer',
                  isSelected ? 'text-background' : ''
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
