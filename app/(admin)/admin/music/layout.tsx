import { AccountSideBar } from '@/app/(main)/account/AccountSideBar';

const sidebarNavItems = [
  {
    title: '트랙 관리',
    href: '/admin/tracks',
  },
];

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full px-4 py-6 lg:px-8 space-y-6">
      <div className="space-between flex items-center">
        <AccountSideBar items={sidebarNavItems} />
      </div>
      {children}
    </div>
  );
}
