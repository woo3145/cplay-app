'use client';

import { MoreVertical, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Link from 'next/link';
import { useState } from 'react';
import { useUIStatusStore } from '@/store/useUIStatusStorage';

export const PlayerMoreButton = () => {
  const [open, setOpen] = useState(false);
  const closePlayer = useUIStatusStore((state) => state.closePlayer);
  const onClickClosePlayer = () => {
    closePlayer();
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="p-2 flex justify-center"
        >
          <MoreVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 mr-8 p-2 text-sm">
        <Link
          href="/"
          className="w-full block px-2 py-1 hover:bg-accent hover:text-accent-foreground cursor-pointer"
        >
          곡 정보
        </Link>

        <div
          onClick={onClickClosePlayer}
          className="w-full block px-2 py-1 hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-md"
        >
          플레이어 닫기
        </div>
      </PopoverContent>
    </Popover>
  );
};
