import { Track } from '@/modules/track/domain/track';
import { RefObject, useEffect } from 'react';
import { Button } from '../ui/button';
import { Heart, Volume1, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '../ui/slider';
import { usePlayerStore } from '@/store/usePlayerStore';
import { PlaylistDialog } from '../playlist/PlaylistDialog';
import { useSession } from 'next-auth/react';
import { toast } from '../ui/use-toast';
import { toggleLikeTrackServerAction } from '@/modules/track/domain/usecases/toggleLikeTrackServerAction';
import { cn } from '@/lib/utils';
import { useToggleLikeTrack } from '@/modules/track/application/useToggleLikeTrack';

interface Props {
  track: Track;
  videoRef: RefObject<HTMLAudioElement>;
}

export const PlayerSideController = ({ track, videoRef }: Props) => {
  const { volume, setVolume, isMuted, setIsMuted } = usePlayerStore(
    (state) => ({
      volume: state.volume,
      setVolume: state.setVolume,
      isMuted: state.isMuted,
      setIsMuted: state.setIsMuted,
    })
  );
  const toggleLikeTrack = useToggleLikeTrack(track.id);

  const changeVolumeHandler = (volume: number[]) => {
    if (!videoRef.current) return;
    if (isMuted) setIsMuted(false);
    videoRef.current.volume = volume[0];
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

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;
  }, [videoRef, isMuted]);

  return (
    <div className="hidden lg:flex w-1/4 shrink-0 justify-end gap-2">
      <div className="group flex gap-2">
        <Slider
          max={1}
          step={0.05}
          value={isMuted ? [0] : [volume]}
          onValueChange={changeVolumeHandler}
          className="w-40 hidden group-hover:flex cursor-pointer"
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
    </div>
  );
};
