import { Header } from '@/components/common/Header';
import { MainSideBar } from '@/app/(main)/MainSideBar';
import {
  Heart,
  LayoutGrid,
  ListMusic,
  Monitor,
  Music,
  Users,
} from 'lucide-react';
import { MobileNav } from '@/components/mobileUI/MobileNav';
import { getSessionUserServerAction } from '@/modules/user/domain/usecases/getSessionUserServerAction';
import { cn } from '@/lib/utils';

const mainSidebarNavItems = [
  {
    href: '/',
    icon: <LayoutGrid className="h-4 w-4" />,
    title: '탐색',
  },
  {
    href: '/sounds',
    icon: <Music className="h-4 w-4" />,
    title: '트랙',
  },
  {
    href: '/community',
    icon: <Users className="h-4 w-4" />,
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

const mobileNavItems = [
  {
    href: '/',
    icon: <LayoutGrid className="h-4 w-4" />,
    title: '탐색',
  },
  {
    href: '/sounds',
    icon: <Music className="h-4 w-4" />,
    title: '트랙',
  },
  {
    href: '/community',
    icon: <Users className="h-4 w-4" />,
    title: '커뮤니티',
  },
  {
    href: '/playlists',
    icon: <ListMusic className="h-4 w-4" />,
    title: '플레이리스트',
  },
];

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUserServerAction();

  return (
    <div className="pt-16">
      <Header user={user} />
      <div className="flex h-auto min-h-[calc(100vh-4rem)]">
        <div
          className={cn(
            'absolute left-0 z-40 w-56 h-auto overflow-auto bg-background',
            'lg:fixed lg:h-full lg:block',
            'portrait:hidden landscape:block' // 모바일 세로 모드일때 보이기
          )}
        >
          <MainSideBar
            mainNavItems={mainSidebarNavItems}
            userNavItems={userSideBarNavItems}
          />
        </div>
        <main className="w-full lg:pl-56 landscape:pl-56">
          <div
            className={cn(
              'h-full lg:border-l pb-40',
              'lg:pb-20 landscape:border-l landscape:pb-20'
            )}
          >
            {children}
          </div>
        </main>

        <div
          className={cn(
            'fixed bottom-0 w-full z-50 bg-foreground',
            'lg-hidden',
            'landscape:hidden' // 모바일 가로모드에서 숨기기
          )}
        >
          <MobileNav mobileNavItems={mobileNavItems} />
        </div>
      </div>
    </div>
  );
}
