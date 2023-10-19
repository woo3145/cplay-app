import { Track } from '@/modules/track/domain/track';
import { RefObject, useEffect } from 'react';
import { Button } from '../ui/button';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '../ui/slider';
import { usePlayerStore } from '@/store/usePlayerStore';

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
  const changeVolumeHandler = (volume: number[]) => {
    if (!videoRef.current) return;
    if (isMuted) setIsMuted(false);
    videoRef.current.volume = volume[0];
    setVolume(volume[0]);
  };
  const toggleMuteHandler = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;
  }, [videoRef, isMuted]);
  return (
    <div className="hidden lg:flex w-1/4 shrink-0 justify-end">
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
    </div>
  );
};
