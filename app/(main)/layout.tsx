import { Header } from '@/components/common/Header';
import { SideBar } from '@/components/common/SideBar';

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
          <SideBar />
        </div>
        <main className="w-full lg:pl-56">
          <div className="h-full lg:border-l">{children}</div>
        </main>
      </div>
    </div>
  );
}
