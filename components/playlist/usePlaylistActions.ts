'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { Track } from '@/modules/track/domain/track';
import { toast } from '../ui/use-toast';
import { createPlaylistServerAction } from '@/modules/playlist/domain/usecases/createPlaylistServerAction';
import { useSession } from 'next-auth/react';
import { editPlaylistServerAction } from '@/modules/playlist/domain/usecases/editPlaylistServerAction';

export const usePlaylistActions = () => {
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

  return { onClickPlay, onClickRemove, onClickSave };
};
