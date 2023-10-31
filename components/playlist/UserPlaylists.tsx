'use client';

import { ListMusic } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { CreatePlaylistDialog } from './CreatePlaylistDialog';
import { useUserStore } from '@/store/useUserStore';

export const UserPlaylists = () => {
  const playlists = useUserStore((state) => state.playlists);

  return (
    <div className="space-y-1 p-2">
      <div className="ml-auto mr-4">
        <CreatePlaylistDialog />
      </div>
      <ScrollArea className="h-[240px] px-1">
        {playlists.map((playlist) => {
          return (
            <Button
              key={playlist.id}
              variant="ghost"
              className="w-full justify-start gap-2 font-normal"
            >
              <ListMusic className="w-5 h-5" />
              {playlist.name}
            </Button>
          );
        })}
      </ScrollArea>
    </div>
  );
};
