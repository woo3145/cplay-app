'use client';

import { DeletePlaylistDialog } from '@/components/playlist/DeletePlaylistDialog';
import { Button } from '@/components/ui/button';
import { formatSeconds } from '@/lib/dateFormat';
import { UserPlaylist } from '@/modules/playlist/domain/playlist';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Play, Shuffle, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  playlist: UserPlaylist;
}

export const PlaylistController = ({ playlist }: Props) => {
  const [coverColor, setCoverColor] = useState(['', '']);
  const [setTrack, setPlaylist] = usePlayerStore((state) => [
    state.setTrack,
    state.setPlaylist,
  ]);

  const onPlayClick = () => {
    setPlaylist(playlist.id, playlist.name, playlist.tracks);
    setTrack(0 < playlist.tracks.length ? playlist.tracks[0] : null);
  };
  const onShufflePlayClick = () => {
    setPlaylist(playlist.id, playlist.name, playlist.tracks);
    setTrack(0 < playlist.tracks.length ? playlist.tracks[0] : null);
  };

  const totalTrackLength = playlist.tracks.reduce(
    (prev, cur) => (prev += cur.length),
    0
  );
  const colors_1 = [
    '#020617',
    '#a5f3fc',
    '#b91c1c',
    '#fde047',
    '#16a34a',
    '#06b6d4',
    '#d9f99d',
    '#a5f3fc',
    '#4f46e5',
  ];
  const colors_2 = [
    '#6d28d9',
    '#bbf7d0',
    '#d8b4fe',
    '#c026d3',
    '#ec4899',
    '#881337',
    '#fecaca',
    '#fed7aa',
    '#c4b5fd',
  ];
  useEffect(() => {
    const color_1 = colors_1[Math.floor(Math.random() * colors_1.length)];
    const color_2 = colors_2[Math.floor(Math.random() * colors_2.length)];

    setCoverColor([color_1, color_2]);

    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div
        style={{
          background: `linear-gradient(62deg, ${coverColor[0]} 0%, ${coverColor[1]} 100%)`,
        }}
        className="w-full aspect-square rounded-xl"
      ></div>
      <div className="flex justify-between items-center pt-2">
        <span className="text-muted-foreground tracking-wide">
          {playlist.tracks.length}곡, 총 {formatSeconds(totalTrackLength)}
        </span>
        <DeletePlaylistDialog playlist={playlist}>
          <span className="flex items-center gap-2 text-destructive cursor-pointer">
            <Trash className="w-4 h-4" /> Delete
          </span>
        </DeletePlaylistDialog>
      </div>
      <div className="flex gap-2 pt-4">
        <Button className="gap-2 w-full" onClick={onPlayClick}>
          <Play className="w-4 h-4" /> 재생
        </Button>
        <Button disabled className="gap-2 w-full" onClick={onShufflePlayClick}>
          <Shuffle className="w-4 h-4" /> 임의 재생
        </Button>
      </div>
    </div>
  );
};
