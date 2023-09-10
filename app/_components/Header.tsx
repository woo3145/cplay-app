import Link from 'next/link';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { UserMenu } from './UserMenu';
import { HeaderNavigation } from './HeaderNavigation';
import { BrandLogo } from './atoms/BrandLogo';

export const Header = async () => {
  return (
    <header className="flex items-center w-full h-14 px-5 font-medium transition-colors duration-200">
      <section>
        <Link href="/">
          <BrandLogo />
        </Link>
      </section>
      <hr className="border-l h-8 mx-6 border-border" />
      <section className="flex flex-auto w-full">
        <HeaderNavigation />
      </section>
      <section className="flex items-center gap-2 flex-shrink-0">
        <UserMenu />
        <DarkModeToggle />
      </section>
    </header>
  );
};
