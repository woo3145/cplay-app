'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { PlaylistItem } from '../playlists/[playlistId]/PlaylistItem';
import { Track } from '@/modules/track/domain/track';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { editPlaylistServerAction } from '@/modules/playlist/domain/usecases/editPlaylistServerAction';
import { useSession } from 'next-auth/react';
import { createPlaylistServerAction } from '@/modules/playlist/domain/usecases/createPlaylistServerAction';

export const PlayerPlaylistContent = () => {
  const { data: session } = useSession();
  const {
    playlistName,
    playlist,
    setTrack,
    currentTrack,
    playlistId,
    setPlaylist,
    setIsPlaying,
    isPlaying,
  } = usePlayerStore((state) => ({
    setTrack: state.setTrack,
    playlist: state.playlist,
    playlistName: state.playlistName,
    currentTrack: state.currentTrack,
    playlistId: state.playlistId,
    setPlaylist: state.setPlaylist,
    setIsPlaying: state.setIsPlaying,
    isPlaying: state.isPlaying,
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
    <div className="flex flex-col w-full gap-2 items-center">
      <div className="w-full pb-4">
        <h2 className="text-2xl line-clamp-1 break-all font-semibold">
          {playlistName}
        </h2>
      </div>

      <ScrollArea className="w-full h-[calc(100vh-240px)] overflow-y-scroll space-y-2">
        {playlist.map((track) => {
          const isSelected = currentTrack && track.id === currentTrack.id;
          return (
            <PlaylistItem
              key={track.id}
              isSelected={isSelected}
              track={track}
              onClickPlay={() => onClickPlay(track)}
              onClickRemove={() => onClickRemove(track)}
            />
          );
        })}
      </ScrollArea>
      <Button
        type="button"
        className="w-full"
        onClick={() => {
          onClickSave(playlist);
        }}
      >
        저장
      </Button>
    </div>
  );
};
