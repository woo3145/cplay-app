'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { usePlayerStore } from '@/store/usePlayerStore';
import { ListMusic } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { PlaylistItem } from '@/app/(main)/playlists/[playlistId]/PlaylistItem';
import { usePlaylistActions } from './usePlaylistActions';

export const PlaylistDialog = () => {
  const { playlistName, playlist, currentTrack } = usePlayerStore((state) => ({
    playlistName: state.playlistName,
    playlist: state.playlist,
    currentTrack: state.currentTrack,
  }));

  const { onClickPlay, onClickRemove, onClickSave } = usePlaylistActions();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="p-2 flex justify-center"
        >
          <ListMusic />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Playlist - {playlistName}</DialogTitle>
          <DialogDescription>
            현재 재생중인 플레이리스트입니다.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          <div className="space-y-2">
            {playlist.map((track) => {
              const isSelected = currentTrack && track.id === currentTrack.id;
              return (
                <PlaylistItem
                  key={track.id}
                  track={track}
                  isSelected={isSelected}
                  onClickPlay={onClickPlay}
                  onClickRemove={onClickRemove}
                />
              );
            })}
          </div>
        </ScrollArea>

        <DialogFooter className="sm:justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              닫기
            </Button>
          </DialogClose>
          <Button type="button" onClick={() => onClickSave(playlist)}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
