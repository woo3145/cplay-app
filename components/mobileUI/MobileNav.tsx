'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props extends React.HTMLAttributes<HTMLElement> {
  mobileNavItems: {
    href: string;
    icon: React.ReactNode;
    title: string;
  }[];
}

export const MobileNav = ({ mobileNavItems }: Props) => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex items-stretch h-16">
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
                  'flex flex-col items-center justify-center w-full gap-1 text-background/60 text-xs',
                  isSelected ? 'text-background' : 'group-hover:text-background'
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
