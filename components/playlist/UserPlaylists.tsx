'use client';

import { ListMusic } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { CreatePlaylistDialog } from './CreatePlaylistDialog';
import { getPlaylistsServerAction } from '@/modules/playlist/domain/usecases/getPlaylistsServerAction';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';

export const UserPlaylists = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-1 p-2">
      <div className="ml-auto mr-4">
        <CreatePlaylistDialog />
      </div>
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
