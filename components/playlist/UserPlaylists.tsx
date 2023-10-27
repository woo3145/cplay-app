'use client';

import { ListMusic, PlusSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

export const UserPlaylists = () => {
  return (
    <div className="space-y-1 p-2">
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 font-normal"
      >
        <PlusSquare className="w-5 h-5" />
        Add Playlist
      </Button>
      <ScrollArea className="h-[240px] px-1">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
          return (
            <Button
              key={item}
              variant="ghost"
              className="w-full justify-start gap-2 font-normal"
            >
              <ListMusic className="w-5 h-5" />
              item {item}
            </Button>
          );
        })}
      </ScrollArea>
    </div>
  );
};
