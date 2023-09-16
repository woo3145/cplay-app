import { Header } from '@/components/Header';
import { AdminSideBar } from '../_components/AdminSideBarMenu';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-16">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="hidden lg:flex flex-shrink-0 w-56 min-h-full">
          <AdminSideBar />
        </div>
        <main className="w-full px-4 pt-4">{children}</main>
      </div>
    </div>
  );
}
