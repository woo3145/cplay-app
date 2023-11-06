'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { PlaylistItem } from '../playlists/[playlistId]/PlaylistItem';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from '@/components/ui/button';
import { usePlaylistActions } from '@/components/playlist/usePlaylistActions';

export const PlayerPlaylistContent = () => {
  const { playlistName, playlist, currentTrack } = usePlayerStore((state) => ({
    playlist: state.playlist,
    playlistName: state.playlistName,
    currentTrack: state.currentTrack,
  }));

  const { onClickPlay, onClickRemove, onClickSave } = usePlaylistActions();
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
