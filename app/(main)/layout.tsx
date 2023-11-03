import { Header } from '@/components/common/Header';
import { MainSideBar } from '@/app/(main)/MainSideBar';
import { Heart, LayoutGrid, Monitor, Music, Users } from 'lucide-react';
import { MobileNav } from '@/components/mobileUI/MobileNav';

const mainSidebarNavItems = [
  {
    href: '/',
    icon: <LayoutGrid className="h-4 w-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4" />,
    title: '탐색',
  },
  {
    href: '/sounds',
    icon: <Music className="h-4 w-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4" />,
    title: '트랙',
  },
  {
    href: '/community',
    icon: <Users className="h-4 w-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4" />,
    title: '커뮤니티',
  },
];

const userSideBarNavItems = [
  {
    href: `/studio/my`, // /studio/my에서 studio/[userId]로 redirect
    icon: <Monitor className="h-4 w-4" />,
    title: '내 스튜디오',
  },
  {
    href: '/',
    icon: <Heart className="h-4 w-4" />,
    title: '좋아요 표시',
  },
];

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-16">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="fixed left-0 hidden h-full lg:block w-56 overflow-auto">
          <MainSideBar
            mainNavItems={mainSidebarNavItems}
            userNavItems={userSideBarNavItems}
          />
        </div>
        <main className="w-full lg:pl-56">
          <div className="h-full lg:border-l">{children}</div>
        </main>
        <MobileNav mainNavItems={mainSidebarNavItems} />
      </div>
    </div>
  );
}
