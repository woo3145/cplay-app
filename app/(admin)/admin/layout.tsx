import { AdminSideBar } from '@/app/(admin)/admin/AdminSideBar';
import { Header } from '@/components/common/Header';
import { MobileNav } from '@/components/mobileUI/MobileNav';
import { cn } from '@/lib/utils';
import { getSessionUserServerAction } from '@/modules/user/domain/usecases/getSessionUserServerAction';
import {
  CreditCard,
  Home,
  LineChart,
  ListMusic,
  MessagesSquare,
  PanelTopOpen,
  Settings,
  Tag,
  Users,
} from 'lucide-react';

const sidebarNavItems = [
  {
    href: `/admin/dashboard`,
    icon: <Home className="mr-2 h-4 w-4" />,
    title: '대시보드',
  },
  {
    href: `/admin/users`,
    icon: <Users className="mr-2 h-4 w-4" />,
    title: '유저 관리',
  },
  {
    href: '/admin/sounds/tracks',
    icon: <ListMusic className="mr-2 h-4 w-4" />,
    title: '트랙 관리',
  },
  {
    href: '/admin/subscriptions',
    icon: <PanelTopOpen className="mr-2 h-4 w-4" />,
    title: '구독 관리',
  },
  {
    href: '/admin/payments',
    icon: <CreditCard className="mr-2 h-4 w-4" />,
    title: '결제 및 환불 관리',
  },
  {
    href: '/admin/community',
    icon: <MessagesSquare className="mr-2 h-4 w-4" />,
    title: '커뮤니티 관리',
  },
  {
    href: '/admin/tags',
    icon: <Tag className="mr-2 h-4 w-4" />,
    title: '태그 및 카테고리 관리',
  },
  {
    href: '/admin/support',
    icon: <Home className="mr-2 h-4 w-4" />,
    title: '고객 지원',
  },
  {
    href: '/admin/analytics',
    icon: <LineChart className="mr-2 h-4 w-4" />,
    title: '분석',
  },
  {
    href: '/admin/settings',
    icon: <Settings className="mr-2 h-4 w-4" />,
    title: '앱 설정',
  },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUserServerAction();
  return (
    <div className="">
      <Header user={user} />
      <div className="flex h-auto min-h-[calc(100vh-4rem)]">
        <div
          className={cn(
            'absolute left-0 z-40 w-56 h-auto pt-16 overflow-auto bg-background',
            'hidden landscape:block', // 모바일 가로 모드일때 보이기
            'lg:fixed lg:h-full' // 데스크탑부턴 헤더가 감춰지지 않음으로 fixed로 고정
          )}
        >
          <AdminSideBar items={sidebarNavItems} />
        </div>
        <main className="w-full lg:pl-56 landscape:pl-56">
          <div
            className={cn(
              'h-full pb-40 pt-16', // 모바일은 BottomNav(h-16) + Player(h-16) = h-32
              'landscape:border-l landscape:pb-28' // 가로 모드부터는 Player(h-20) = h-20
            )}
          >
            {children}
          </div>
        </main>

        <div
          className={cn(
            'fixed bottom-0 w-full z-50 bg-foreground',
            'landscape:hidden' // 모바일 가로 모드 사이즈부터는 BottomNav 사용 X
          )}
        >
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
