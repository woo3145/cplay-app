'use client';

import Link from 'next/link';
import { cn } from '@/libs/utils';
import { usePathname } from 'next/navigation';

const adminNavigation = [
  {
    href: `/admin/dashboard`,
    name: '🏡 대시보드',
  },
  {
    href: `/admin/users`,
    name: '👨‍👨‍👧‍👦 유저 관리',
  },
  {
    href: '/admin/subscriptions',
    name: '❤️ 구독 관리',
  },
  {
    href: '/admin/payments',
    name: '💰 결제 및 환불 관리',
  },
  {
    href: '/admin/tracks',
    name: '🎼 트랙 관리',
  },
  {
    href: '/admin/support',
    name: '💁 고객 지원',
  },
  {
    href: '/admin/analytics',
    name: '🔎 분석',
  },
  {
    href: '/admin/settings',
    name: '⚙️ 앱 설정',
  },
];

export const AdminSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full overflow-y-auto border-r border-border font-semibold tracking-widest">
      <div className="mb-4 border-t border-border pt-4">
        <ul className="text-sm">
          <li>
            <Link
              href={'/'}
              className={cn(
                'flex items-center w-full px-4 py-2.5 cursor-pointer',
                'hover:bg-accent rounded-lg'
              )}
            >
              🚪 나가기
            </Link>
          </li>
        </ul>
      </div>
      <div className="mb-4 border-t border-border pt-4">
        <p className="px-4 mb-2 text-xs text-foreground/80">어드민 메뉴</p>
        <ul className="text-sm">
          {adminNavigation.map((nav) => {
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
    </div>
  );
};
