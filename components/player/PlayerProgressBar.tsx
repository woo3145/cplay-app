'use client';

import { formatSeconds } from '@/lib/dateFormat';
import { Slider } from '../ui/slider';
import { cn } from '@/lib/utils';
import { usePlayerStore } from '@/store/usePlayerStore';

interface Props {
  duration: number;
  currentTimeChangeHandler: (time: number[]) => void;
}

export const PlayerProgressBar = ({
  duration,
  currentTimeChangeHandler,
}: Props) => {
  const { currentTime, currentTrack } = usePlayerStore((state) => ({
    currentTime: state.currentTime,
    currentTrack: state.currentTrack,
  }));
  return (
    <div className="absolute lg:static top-0 flex items-center w-full text-xs gap-4">
      <span className="hidden lg:block">{formatSeconds(currentTime)}</span>
      <Slider
        max={duration}
        value={[currentTime]}
        onValueChange={currentTimeChangeHandler}
        className={cn('w-full cursor-pointer')}
      />
      <span className="hidden lg:block">
        {formatSeconds(currentTrack?.length ?? 0)}
      </span>
    </div>
  );
};
