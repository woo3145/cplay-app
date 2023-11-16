import { Header } from '@/components/common/Header';
import { MainSideBar } from '@/app/(main)/MainSideBar';
import { Heart, LayoutGrid, Music } from 'lucide-react';
import { MobileNav } from '@/components/mobileUI/MobileNav';
import { getSessionUserServerAction } from '@/modules/user/domain/usecases/getSessionUserServerAction';
import { cn } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';

const mainSidebarNavItems = [
  {
    href: '/',
    icon: <LayoutGrid className="h-4 w-4" />,
    title: '탐색',
  },
  {
    href: '/tracks',
    icon: <Music className="h-4 w-4" />,
    title: '트랙',
  },
];

const userSideBarNavItems = [
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
  const session = await getServerSession(authOptions);

  const userResult = session
    ? await getSessionUserServerAction(session.user.id)
    : null;

  const user = userResult?.success ? userResult.data : null;

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
          <MainSideBar
            mainNavItems={mainSidebarNavItems}
            userNavItems={userSideBarNavItems}
          />
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
            'fixed bottom-0 w-full z-50 bg-background',
            'landscape:hidden' // 모바일 가로 모드 사이즈부터는 BottomNav 사용 X
          )}
        >
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
