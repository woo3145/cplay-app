'use client';

import { CreditCard, LogOut, Settings, User } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User as DomainUser } from '@/modules/user/domain/user';

interface Props {
  user: DomainUser | null;
}

export function UserMenu({ user }: Props) {
  const onClickLogout = () => {
    signOut();
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={user.image ?? ''} alt="user avatar" />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/account/general" prefetch={false}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>프로필 관리</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/" prefetch={false}>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>구독 관리</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/" prefetch={false}>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>설정</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onClickLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex items-center gap-2">
      <Link href="/signin">
        <Button variant="ghost">로그인</Button>
      </Link>
      <Link href="/register">
        <Button>회원가입</Button>
      </Link>
    </div>
  );
}
