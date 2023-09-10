import Link from 'next/link';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { LogoIcon } from './LogoIcon';
import { UserMenu } from './UserMenu';

export const Header = async () => {
  return (
    <header className="flex items-center w-full h-14 px-5 font-medium transition-colors duration-200">
      <section>
        <Link
          href="/"
          className="flex items-center gap-2 px-2 text-lg text-foreground hover:text-foreground/80 "
        >
          <LogoIcon className="w-7 h-7" />
          <span>CanPlay</span>
        </Link>
      </section>
      <hr className="border-l h-8 mx-6 border-border" />
      <section className="flex flex-auto w-full">
        <nav className="flex flex-auto items-center gap-2">
          <Link
            href="/"
            className="px-2 transition-colors text-foreground/60 hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/"
            className="px-2 transition-colors text-foreground/60 hover:text-foreground"
          >
            Sounds
          </Link>
          <Link
            href="/"
            className="px-2 transition-colors text-foreground/60 hover:text-foreground"
          >
            Community
          </Link>
        </nav>
      </section>
      <section className="flex items-center gap-2 flex-shrink-0">
        <UserMenu />
        <DarkModeToggle />
      </section>
    </header>
  );
};
