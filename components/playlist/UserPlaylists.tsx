'use client';

import { ListMusic } from 'lucide-react';
import { Button } from '../ui/button';
import { CreatePlaylistDialog } from './CreatePlaylistDialog';
import { useUserStore } from '@/store/useUserStore';
import Link from 'next/link';
import { usePlayerStore } from '@/store/usePlayerStore';
import { cn } from '@/lib/utils';

export const UserPlaylists = () => {
  const playlists = useUserStore((state) => state.playlists);
  const currentPlaylistId = usePlayerStore((state) => state.playlistId);

  return (
    <div className="space-y-1">
      <div className="ml-auto">
        <CreatePlaylistDialog />
      </div>
      {playlists.map((playlist) => {
        const isSelected =
          currentPlaylistId && currentPlaylistId === playlist.id;
        return (
          <Link
            key={playlist.id}
            href={`/playlists/${playlist.id}`}
            prefetch={false}
          >
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-2 font-normal',
                isSelected && 'bg-muted'
              )}
            >
              <ListMusic className="w-5 h-5" />
              <span className="line-clamp-1 break-all">{playlist.name}</span>
            </Button>
          </Link>
        );
      })}
    </div>
  );
};
