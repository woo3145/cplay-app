'use client';
import Link from 'next/link';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { UserMenu } from '@/components/common/UserMenu';
import { BrandLogo } from '@/components/common/BrandLogo';
import { SessionUser } from '@/modules/user/domain/user';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  user: SessionUser | null;
}

export const Header = ({ user }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      if (20 <= st && st > lastScrollTop.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 border-b border-border bg-background transition-transform duration-300',
        isVisible ? 'translate-y-0' : '-translate-y-20 lg:translate-y-0'
      )}
    >
      <div className="flex items-center justify-between w-full h-16 px-4 mx-auto font-medium transition-colors duration-200">
        <section className="flex lg:flex-shrink-0 lg:w-52">
          <Link href="/">
            <BrandLogo size="md" />
          </Link>
        </section>
        <section className="flex items-center gap-4 flex-shrink-0">
          <UserMenu user={user} />
          <DarkModeToggle />
        </section>
      </div>
    </header>
  );
};
