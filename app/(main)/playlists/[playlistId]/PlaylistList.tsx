'use client';

import { Button } from '@/components/ui/button';
import { UserPlaylist } from '@/modules/playlist/domain/playlist';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PlaylistItem } from './PlaylistItem';
import { useState } from 'react';
import { usePlaylistActions } from '@/components/playlist/usePlaylistActions';

interface Props {
  playlist: UserPlaylist;
}

export const PlaylistList = ({ playlist }: Props) => {
  const router = useRouter();
  const [_playlist, _setPlaylist] = useState(playlist.tracks);
  const [setTrack, setPlaylist, currentTrack] = usePlayerStore((state) => [
    state.setTrack,
    state.setPlaylist,
    state.currentTrack,
  ]);

  const { onClickPlay } = usePlaylistActions();

  const onClickAddTrack = () => {
    setPlaylist(playlist.id, playlist.name, []);
    setTrack(null, null);
    router.push('/');
  };

  return (
    <div className="w-full pt-4 space-y-2">
      {!playlist.tracks.length ? (
        <div className="flex flex-col items-center justify-center">
          <p className="pt-4 pb-8">현재 플레이리스에 트랙이 없습니다.</p>
          <Button
            variant="outline"
            className="flex gap-2"
            onClick={onClickAddTrack}
          >
            <Plus className="w-4 h-4" />
            트랙 추가하기
          </Button>
        </div>
      ) : null}
      {_playlist.map((track) => {
        const isSelected = currentTrack && track.id === currentTrack.id;
        return (
          <PlaylistItem
            key={track.id}
            isSelected={isSelected}
            track={track}
            onClickPlay={onClickPlay}
          />
        );
      })}
    </div>
  );
};
