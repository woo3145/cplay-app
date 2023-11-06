'use client';

import { Button } from '../ui/button';
import { Heart, Volume1, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '../ui/slider';
import { usePlayerStore } from '@/store/usePlayerStore';
import { PlaylistDialog } from '../playlist/PlaylistDialog';
import { cn } from '@/lib/utils';
import { useToggleLikeTrack } from '@/modules/track/application/useToggleLikeTrack';
import { PlayerMoreButton } from './PlayerMoreButton';

export const PlayerSideController = () => {
  const { track, volume, setVolume, isMuted, setIsMuted } = usePlayerStore(
    (state) => ({
      track: state.currentTrack,
      volume: state.volume,
      setVolume: state.setVolume,
      isMuted: state.isMuted,
      setIsMuted: state.setIsMuted,
    })
  );
  const toggleLikeTrack = useToggleLikeTrack(track ? track.id : null);

  const changeVolumeHandler = (volume: number[]) => {
    if (isMuted) setIsMuted(false);
    setVolume(volume[0]);
  };

  const toggleMuteHandler = () => {
    setIsMuted(!isMuted);
  };

  const onLikeClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // 좋아요 버튼 클릭 이벤트가 트랙 클릭 이벤트로 전파되는 것을 방지
    event.stopPropagation();
    await toggleLikeTrack();
  };

  return (
    <div className="hidden lg:flex w-1/4 shrink-0 justify-end gap-2">
      <div className="group flex items-center gap-2">
        <Slider
          max={1}
          step={0.05}
          value={isMuted ? [0] : [volume]}
          onValueChange={changeVolumeHandler}
          className="w-40 hidden group-hover:flex cursor-pointer h-4 px-2 rounded-md"
        />
        <Button
          type="button"
          variant="ghost"
          onClick={toggleMuteHandler}
          className="p-2 flex justify-center"
        >
          {isMuted || volume === 0 ? <VolumeX /> : null}
          {!isMuted && 0 < volume && volume < 0.6 ? <Volume1 /> : null}
          {!isMuted && 0.6 <= volume ? <Volume2 /> : null}
        </Button>
      </div>
      <PlaylistDialog />
      <PlayerMoreButton />
      {track ? (
        <Button
          type="button"
          variant="ghost"
          onClick={onLikeClick}
          className="p-2 flex justify-center"
        >
          <Heart
            className={cn(
              'w-5 h-5',
              track.likedByUser ? 'text-primary' : 'text-foreground/20'
            )}
          />
        </Button>
      ) : null}
    </div>
  );
};
