import { AccountNavTabs } from './AccountNavTabs';

const sidebarNavItems = [
  {
    title: '프로필',
    href: '/account/general',
  },
  {
    title: '결제 / 구독',
    href: '/account/billing',
  },
  {
    title: '패스워드 변경',
    href: '/account/password',
  },
];

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="flex flex-col space-y-8 w-full lg:max-w-5xl mx-auto">
        <aside>
          <AccountNavTabs items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
