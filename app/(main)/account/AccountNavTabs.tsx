'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface AccountNavTabsProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function AccountNavTabs({
  className,
  items,
  ...props
}: AccountNavTabsProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex space-x-2', className)} {...props}>
      {items.map((item) => {
        const isSelected = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              isSelected
                ? 'bg-accent hover:bg-accent'
                : 'hover:bg-transparent hover:underline',
              'justify-start'
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
