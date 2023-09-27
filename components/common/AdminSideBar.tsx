'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Role } from '@prisma/client';
import {
  CreditCard,
  DoorOpen,
  Home,
  LineChart,
  ListMusic,
  PanelTopOpen,
  Settings,
  Users,
} from 'lucide-react';

const adminNavigations = [
  {
    href: `/admin/dashboard`,
    icon: <Home className="mr-2 h-4 w-4" />,
    name: '대시보드',
  },
  {
    href: `/admin/users`,
    icon: <Users className="mr-2 h-4 w-4" />,
    name: '유저 관리',
  },
  {
    href: '/admin/tracks',
    icon: <ListMusic className="mr-2 h-4 w-4" />,
    name: '트랙 관리',
  },
  {
    href: '/admin/subscriptions',
    icon: <PanelTopOpen className="mr-2 h-4 w-4" />,
    name: '구독 관리',
  },
  {
    href: '/admin/payments',
    icon: <CreditCard className="mr-2 h-4 w-4" />,
    name: '결제 및 환불 관리',
  },

  {
    href: '/admin/support',
    icon: <Home className="mr-2 h-4 w-4" />,
    name: '고객 지원',
  },
  {
    href: '/admin/analytics',
    icon: <LineChart className="mr-2 h-4 w-4" />,
    name: '분석',
  },
  {
    href: '/admin/settings',
    icon: <Settings className="mr-2 h-4 w-4" />,
    name: '앱 설정',
  },
];

interface SidebarProps {
  className?: string;
}

export function AdminSideBar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <div className={cn('pb-12', className)}>
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
            {adminNavigations.map((nav) => {
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
      </div>
    </div>
  );
}
