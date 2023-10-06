import { MusicNavTabs } from './MusicNavTabs';

const sidebarNavItems = [
  {
    title: '트랙 관리',
    href: '/admin/music/tracks',
  },
  {
    title: '번들 관리',
    href: '/admin/music/bundles',
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
        <MusicNavTabs items={sidebarNavItems} />
      </div>
      {children}
    </div>
  );
}
