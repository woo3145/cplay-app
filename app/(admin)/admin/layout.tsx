import { AdminSideBar } from '@/app/(admin)/admin/AdminSideBar';
import { Header } from '@/components/common/Header';
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
    href: '/admin/music/tracks',
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-16">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="fixed left-0 hidden h-full lg:block w-56 overflow-auto">
          <AdminSideBar items={sidebarNavItems} />
        </div>
        <main className="w-full lg:pl-56">
          <div className="h-full lg:border-l">{children}</div>
        </main>
      </div>
    </div>
  );
}
