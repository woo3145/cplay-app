'use client';

import { cn } from '@/lib/utils';
import { Track } from '@/modules/track/domain/track';
import Image from 'next/image';
import { Heart, Pause, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { useToggleLikeTrack } from '@/modules/track/application/useToggleLikeTrack';
import { usePlayerStore } from '@/store/usePlayerStore';

interface Props {
  track: Track;
  onClick: (track: Track) => void;
}

export const TrackItem = ({ track, onClick }: Props) => {
  const [currentTrack, isPlaying, setIsPlaying, isBundleSelected] =
    usePlayerStore((state) => [
      state.currentTrack,
      state.isPlaying,
      state.setIsPlaying,
      state.isBundleSelected,
    ]);

  const isSelectedTrack =
    !isBundleSelected && currentTrack && currentTrack.id === track.id;

  const toggleLikeTrack = useToggleLikeTrack(track.id);
  const onTrackClick = () => {
    // 이미 선택 된 트랙이라면 isPlaying 토글
    if (isSelectedTrack) {
      setIsPlaying(!isPlaying);
      return;
    }

    onClick(track);
  };

  const onLikeClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // 좋아요 버튼 클릭 이벤트가 트랙 클릭 이벤트로 전파되는 것을 방지
    event.stopPropagation();
    await toggleLikeTrack();
  };
  return (
    <div
      key={track.title}
      className={cn('relative space-y-3 cursor-pointer w-full shrink-0')}
      onClick={onTrackClick}
    >
      <Button
        variant="outline"
        className={cn('absolute top-1 left-1 w-8 h-8 p-0 z-30 shadow shrink-0')}
        onClick={onLikeClick}
      >
        <Heart
          className={cn(
            'w-5 h-5',
            track.likedByUser ? 'text-primary' : 'text-foreground/20'
          )}
        />
      </Button>
      <div className="relative flex items-center justify-center group">
        <Image
          src={track.imageUrl}
          alt={track.title}
          width={256}
          height={256}
          className={cn(
            'w-full object-cover transition-all aspect-square rounded-md group-hover:brightness-50',
            isSelectedTrack && isPlaying && 'brightness-50'
          )}
        />

        {isSelectedTrack && isPlaying ? (
          <Pause
            className={cn(
              'absolute w-7 h-7 hidden group-hover:block text-white text-primary',
              isSelectedTrack && 'block'
            )}
          />
        ) : (
          <Play
            className={cn(
              'absolute w-7 h-7 hidden group-hover:block text-white text-primary',
              isSelectedTrack && isPlaying && 'block'
            )}
          />
        )}
      </div>

      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{track.title}</h3>
        <p className="text-xs text-muted-foreground">{track.creator?.name}</p>
      </div>
    </div>
  );
};
