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
import { ListMusic, Pause, Play, X } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Track } from '@/modules/track/domain/track';
import { toast } from '../ui/use-toast';
import { createPlaylistServerAction } from '@/modules/playlist/domain/usecases/createPlaylistServerAction';
import { useSession } from 'next-auth/react';
import { editPlaylistServerAction } from '@/modules/playlist/domain/usecases/editPlaylistServerAction';
import { PlaylistItem } from '@/app/(main)/playlists/[playlistId]/PlaylistItem';

export const PlaylistDialog = () => {
  const { data: session } = useSession();
  const {
    playlistName,
    playlistId,
    playlist,
    currentTrack,
    setTrack,
    setPlaylist,
    isPlaying,
    setIsPlaying,
  } = usePlayerStore((state) => ({
    playlistName: state.playlistName,
    playlistId: state.playlistId,
    playlist: state.playlist,
    currentTrack: state.currentTrack,
    setTrack: state.setTrack,
    setPlaylist: state.setPlaylist,
    isPlaying: state.isPlaying,
    setIsPlaying: state.setIsPlaying,
  }));

  const onClickPlay = (track: Track) => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setTrack(track);
    }
  };

  const onClickRemove = (track: Track) => {
    if (playlistId === null) return;
    if (currentTrack && currentTrack.id === track.id) {
      toast({
        variant: 'default',
        title: '현재 재생중인 선택된 트랙 입니다.',
      });
      return;
    }
    setPlaylist(
      playlistId,
      playlistName,
      playlist.filter((t) => t.id !== track.id)
    );
  };

  const onClickSave = async (playlist: Track[]) => {
    if (!session?.user) {
      toast({
        variant: 'default',
        title: '로그인이 필요합니다.',
      });
      return;
    }
    if (playlistId === null) return;
    if (playlistId === 'custom') {
      const result = await createPlaylistServerAction({
        userId: session.user.id,
        name: playlistName,
        trackIds: playlist.map((track) => track.id),
      });

      if (!result.success) {
        toast({
          variant: 'destructive',
          title: result.message,
        });
        return;
      }

      if (result.success) {
        toast({
          variant: 'success',
          title: '새 플레이리스트를 생성했습니다.',
        });

        if (result.playlist)
          setPlaylist(result.playlist.id, playlistName, result.playlist.tracks);

        return;
      }
      return;
    } else {
      const result = await editPlaylistServerAction(playlistId, {
        userId: session.user.id,
        name: playlistName,
        trackIds: playlist.map((track) => track.id),
      });

      if (!result.success) {
        toast({
          variant: 'destructive',
          title: result.message,
        });
        return;
      }

      if (result.success) {
        toast({
          variant: 'success',
          title: '플레이리스트를 저장했습니다.',
        });
        return;
      }
    }
  };

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
