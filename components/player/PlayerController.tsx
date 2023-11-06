'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { Button } from '../ui/button';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { PlayerProgressBar } from './PlayerProgressBar';
import { cn } from '@/lib/utils';

interface Props {
  isResponsiveUI?: boolean;
}

export const PlayerController = ({ isResponsiveUI }: Props) => {
  const { track, isPlaying, setIsPlaying, changeMusic } = usePlayerStore(
    (state) => ({
      track: state.currentTrack,
      isPlaying: state.isPlaying,
      setIsPlaying: state.setIsPlaying,
      changeMusic: state.changeMusic,
    })
  );

  const prevClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    changeMusic('prev');
  };
  const nextClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    changeMusic('next');
  };
  const playClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={cn(
        isResponsiveUI
          ? 'flex justify-center lg:max-w-xl lg:w-full'
          : 'max-w-xl w-full'
      )}
    >
      <div className="flex flex-col items-center w-full gap-2 ">
        {/* 이전곡, 재생, 다음곡 */}
        <div
          className={cn(
            'flex items-center w-full',
            isResponsiveUI ? 'justify-end lg:justify-center' : 'justify-center'
          )}
        >
          <div className="flex gap-4 shrink-0">
            <Button
              shape="circle"
              type="button"
              variant="ghost"
              onClick={prevClickHandler}
              className="shrink-0 w-10 h-10 p-3"
              disabled={!track}
            >
              <SkipBack />
            </Button>

            <Button
              shape="circle"
              type="button"
              onClick={playClickHandler}
              className="shrink-0 w-10 h-10 p-3"
              disabled={!track}
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>

            <Button
              shape="circle"
              type="button"
              variant="ghost"
              className="shrink-0 w-10 h-10 p-3"
              onClick={nextClickHandler}
              disabled={!track}
            >
              <SkipForward />
            </Button>
          </div>
        </div>
        <PlayerProgressBar isResponsiveUI={isResponsiveUI} />
      </div>
    </div>
  );
};
