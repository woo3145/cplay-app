'use client';

import { PlayerController } from '@/components/player/PlayerController';
import { PlayerProgressBar } from '@/components/player/PlayerProgressBar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToggleLikeTrack } from '@/modules/track/application/useToggleLikeTrack';
import { Track } from '@/modules/track/domain/track';
import { Heart } from 'lucide-react';
import Image from 'next/image';

interface Props {
  track: Track | null;
}

export const PlayerTrackContent = ({ track }: Props) => {
  const toggleLikeTrack = useToggleLikeTrack(track ? track.id : null);

  const onLikeClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await toggleLikeTrack();
  };

  return (
    <div className="flex flex-col w-full gap-2 items-center">
      <div className="w-full pb-4">
        <h2 className="text-2xl line-clamp-1 break-all font-semibold">
          {track ? track.title : '재생중인 곡이 없습니다.'}
        </h2>
        <p className="text-lg line-clamp-1 break-all text-muted-foreground/80">
          {track?.creator ? track.creator.name : ''}
        </p>
      </div>
      {track ? (
        <Image
          src={track.imageUrl}
          width={500}
          height={500}
          sizes="100vw"
          loading="eager"
          className="aspect-square object-cover rounded-md"
          alt={'coverImage'}
        />
      ) : (
        <div className="w-full max-w-[500px] aspect-square object-cover rounded-md bg-slate-300" />
      )}
      {track ? (
        <div className="py-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onLikeClick}
            className="p-2 flex justify-center"
          >
            <Heart
              className={cn(
                'w-8 h-8',
                track.likedByUser ? 'text-primary' : 'text-foreground/20'
              )}
            />
          </Button>
        </div>
      ) : null}
      <PlayerController />
    </div>
  );
};
