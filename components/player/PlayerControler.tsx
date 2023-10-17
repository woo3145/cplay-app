'use client';

import { Track } from '@/modules/track/domain/track';
import { usePlayerStore } from '@/store/usePlayerStore';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { cn } from '@/lib/utils';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { formatSeconds } from '@/lib/dateFormat';

interface Props {
  track: Track;
}
export const PlayerController = ({ track }: Props) => {
  const {
    currentTime,
    volume,
    stemType,
    isPlaying,
    setIsPlaying,
    setCurrentTime,
  } = usePlayerStore((state) => ({
    currentTime: state.currentTime,
    volume: state.volume,
    stemType: state.stemType,
    isPlaying: state.isPlaying,
    setIsPlaying: state.setIsPlaying,
    setCurrentTime: state.setCurrentTime,
  }));
  const [duration, setDuration] = useState<number>();
  const ref = useRef<HTMLAudioElement>(null);
  const trackSrc = useMemo(() => {
    if (!track.stems.length) return null;
    const curStem = track.stems.filter((stem) => stem.stemType === stemType);

    return curStem.length ? curStem[0].src : null;
  }, [stemType, track]);

  const currentTimeUpdateHandler = () => {
    if (!ref.current) return;
    setCurrentTime(ref.current.currentTime);
  };

  const playClickHandler = () => {
    if (!ref.current) return;
    setIsPlaying(!isPlaying);
  };

  const metadataLoadHandler = () => {
    if (!ref.current) return;
    setDuration(ref.current.duration);
  };

  const currentTimeChangeHandler = (time: number[]) => {
    if (!ref.current) return;
    ref.current.currentTime = time[0];
  };

  useEffect(() => {
    if (!ref.current || !trackSrc) return;
    ref.current.src = trackSrc;
    ref.current.volume = volume;
    ref.current.currentTime = currentTime;
    if (!isPlaying) {
      ref.current.pause();
    } else {
      const playPromise = ref.current.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {}).catch((error) => {});
      }
    }
    // eslint-disable-next-line
  }, [trackSrc, isPlaying]);
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full max-w-xl">
        <div className="flex gap-4">
          <Button
            shape="circle"
            type="button"
            variant="ghost"
            className="shrink-0 w-10 h-10 p-3"
          >
            <SkipBack />
          </Button>

          <Button
            shape="circle"
            type="button"
            onClick={playClickHandler}
            className="shrink-0 w-10 h-10 p-3"
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>

          <Button
            shape="circle"
            type="button"
            variant="ghost"
            className="shrink-0 w-10 h-10 p-3"
          >
            <SkipForward />
          </Button>
        </div>
        <div className="flex items-center w-full text-sm gap-2">
          <span>{formatSeconds(currentTime)}</span>
          <Slider
            max={duration}
            value={[currentTime]}
            onValueChange={currentTimeChangeHandler}
            className={cn('w-full cursor-pointer')}
          />
          <span>{formatSeconds(track.length)}</span>
        </div>
      </div>
      {track && trackSrc && (
        <audio
          ref={ref}
          onTimeUpdate={currentTimeUpdateHandler}
          onLoadedMetadata={metadataLoadHandler}
        >
          <source src={trackSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};
