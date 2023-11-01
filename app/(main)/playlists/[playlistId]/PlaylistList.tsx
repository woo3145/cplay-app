'use client';

import { Button } from '@/components/ui/button';
import { formatSeconds } from '@/lib/dateFormat';
import { cn } from '@/lib/utils';
import { UserPlaylist } from '@/modules/playlist/domain/playlist';
import { Track } from '@/modules/track/domain/track';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  playlist: UserPlaylist;
}

export const PlaylistList = ({ playlist }: Props) => {
  const router = useRouter();
  const [setTrack, setPlaylist, currentTrack] = usePlayerStore((state) => [
    state.setTrack,
    state.setPlaylist,
    state.currentTrack,
  ]);

  const onClickPlay = (track: Track) => {
    setPlaylist(playlist.id, playlist.name, playlist.tracks);
    setTrack(track);
  };

  const onClickAddTrack = () => {
    setPlaylist(playlist.id, playlist.name, playlist.tracks);
    setTrack(null);
    router.push('/');
  };
  return (
    <ul className="w-full pt-4 space-y-2">
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
      {playlist.tracks.map((track) => {
        const isSelected = currentTrack && track.id === currentTrack.id;
        return (
          <li
            key={track.id}
            className={cn(
              'flex items-center px-4 py-1 gap-2 cursor-pointer rounded-md',
              isSelected ? 'bg-muted' : 'hover:bg-muted'
            )}
            onClick={() => onClickPlay(track)}
          >
            <Image
              src={track.imageUrl}
              alt="trackCoverImage"
              width={40}
              height={40}
              className="aspect-square rounded-md"
            />
            <span className="w-full">{track.title}</span>
            <span className="text-muted-foreground text-sm">
              {formatSeconds(track.length)}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
