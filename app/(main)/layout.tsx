import { Header } from '@/components/common/Header';
import { SideBar } from '@/components/common/SideBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-16">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="hidden lg:flex flex-shrink-0 w-56 min-h-full">
          <SideBar />
        </div>
        <main className="w-full px-4 pt-4">{children}</main>
      </div>
    </div>
  );
}
