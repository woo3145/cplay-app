import Link from 'next/link';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { UserMenu } from '@/components/common/UserMenu';
import { BrandLogo } from '@/components/common/BrandLogo';

export const Header = async () => {
  return (
    <header className="fixed top-0 left-0 w-full border-b border-border bg-background">
      <div className="flex items-center justify-between w-full h-16 px-4 mx-auto font-medium transition-colors duration-200">
        <section className="flex lg:flex-shrink-0 lg:w-52">
          <Link href="/">
            <BrandLogo size="md" />
          </Link>
        </section>
        {/* <section className="flex flex-auto w-full">
          <HeaderNavigation />
        </section> */}
        <section className="flex items-center gap-4 flex-shrink-0">
          <UserMenu />
          <DarkModeToggle />
        </section>
      </div>
    </header>
  );
};
