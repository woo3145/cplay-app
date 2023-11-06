'use client';

import { formatSeconds } from '@/lib/dateFormat';
import { Slider } from '../ui/slider';
import { cn } from '@/lib/utils';
import { usePlayerStore } from '@/store/usePlayerStore';
import { useUIStatusStore } from '@/store/useUIStatusStorage';

// currentTime 업데이트 과정
// setPlayerCurrentTime(UI Store) 업데이트
// -> useAudioPlayer의 useEffect가 트리거로 받아 audioRef.currentTime 업데이트
// -> audioRef에 등록된 eventHandler가 setCurrentTime(Player Store) 업데이트

interface Props {
  isResponsiveUI?: boolean;
}

export const PlayerProgressBar = ({ isResponsiveUI }: Props) => {
  const { currentTime, duration } = usePlayerStore((state) => ({
    currentTime: state.currentTime, // 실제 오디오 객체의 currentTime
    duration: state.duration,
  }));
  const { setPlayerCurrentTime } = useUIStatusStore((state) => ({
    setPlayerCurrentTime: state.setPlayerCurrentTime, // SlideBar의 currentTime
  }));

  const currentTimeChangeHandler = (time: number[]) => {
    setPlayerCurrentTime(time[0]);
  };

  return (
    <div
      className={cn(
        'flex items-center w-full text-xs gap-4',
        isResponsiveUI && 'absolute top-0 left-0 lg:static'
      )}
    >
      <span className={cn(isResponsiveUI ? 'hidden lg:block' : 'block')}>
        {formatSeconds(currentTime)}
      </span>
      <Slider
        max={duration}
        value={[currentTime]}
        onValueChange={currentTimeChangeHandler}
        className={cn('w-full cursor-pointer')}
      />
      <span className={cn(isResponsiveUI && 'hidden lg:block')}>
        {formatSeconds(duration)}
      </span>
    </div>
  );
};
