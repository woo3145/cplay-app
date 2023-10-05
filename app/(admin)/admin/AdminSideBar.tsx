'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DoorOpen } from 'lucide-react';

interface AdminSideBarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    icon: React.ReactNode;
    title: string;
  }[];
}

export function AdminSideBar({
  className,
  items,
  ...props
}: AdminSideBarProps) {
  const pathname = usePathname();
  return (
    <div className={cn('pb-12', className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Admin
          </h2>
          <div className="space-y-1">
            <Link href="/" prefetch={false}>
              <Button variant="ghost" className="w-full justify-start">
                <DoorOpen className="mr-2 h-4 w-4" />
                나가기
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Manage
          </h2>

          <div className="space-y-1">
            {items.map((nav) => {
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
      </div>
    </div>
  );
}
