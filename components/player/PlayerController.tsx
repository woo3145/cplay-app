'use client';

import { Track } from '@/modules/track/domain/track';
import { usePlayerStore } from '@/store/usePlayerStore';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { MoreVertical, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { PlayerProgressBar } from './PlayerProgressBar';
import { PlaylistDialog } from '../playlist/PlaylistDialog';

interface Props {
  track: Track | null;
  videoRef: RefObject<HTMLAudioElement>;
}
export const PlayerController = ({ track, videoRef }: Props) => {
  const {
    currentTime,
    volume,
    stemType,
    isPlaying,
    setIsPlaying,
    setCurrentTime,
    changeMusic,
    playlistId,
    selectedBundleId,
  } = usePlayerStore((state) => ({
    currentTime: state.currentTime,
    volume: state.volume,
    stemType: state.stemType,
    isPlaying: state.isPlaying,
    setIsPlaying: state.setIsPlaying,
    setCurrentTime: state.setCurrentTime,
    changeMusic: state.changeMusic,
    playlistId: state.playlistId,
    selectedBundleId: state.selectedBundleId,
  }));
  const [duration, setDuration] = useState<number>(0);
  const trackSrc = useMemo(() => {
    if (!track || !track.stems.length) return null;
    const curStem = track.stems.filter((stem) => stem.stemType === stemType);
    return curStem.length ? curStem[0].src : null;
  }, [stemType, track]);

  const currentTimeUpdateHandler = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const playClickHandler = () => {
    if (!videoRef.current) return;
    setIsPlaying(!isPlaying);
  };

  const metadataLoadHandler = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const currentTimeChangeHandler = (time: number[]) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time[0];
  };

  useEffect(() => {
    if (!videoRef.current || !trackSrc) return;
    videoRef.current.src = trackSrc;
    videoRef.current.volume = volume;
    videoRef.current.currentTime = currentTime;
    if (!isPlaying) {
      videoRef.current.pause();
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {}).catch((error) => {});
      }
    }
    // eslint-disable-next-line
  }, [trackSrc, isPlaying, playlistId, selectedBundleId]);

  return (
    <div className="flex justify-center w-full lg:max-w-xl mx-auto">
      {/* (예정) 모바일에서 플레이어의 배경을 누르면 모바일 플레이어 모달 오픈 */}
      <div className="flex flex-col items-center w-full gap-2 lg:gap-0">
        {/* 이전곡, 재생, 다음곡 */}
        <div className="flex justify-center items-center w-full">
          <div className="w-full lg:hidden">
            <PlaylistDialog />
          </div>
          <div className="flex gap-4 shrink-0">
            <Button
              shape="circle"
              type="button"
              variant="ghost"
              onClick={() => changeMusic('prev')}
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
              onClick={() => changeMusic('next')}
              disabled={!track}
            >
              <SkipForward />
            </Button>
          </div>
          <div className="w-full lg:hidden flex justify-end">
            {/* (예정) Open Track Menu (좋아요, 상세페이지 이동 등)*/}
            <Button
              type="button"
              variant="ghost"
              className="p-2 flex justify-center"
            >
              <MoreVertical />
            </Button>
          </div>
        </div>
        <PlayerProgressBar
          duration={duration}
          currentTimeChangeHandler={currentTimeChangeHandler}
        />
      </div>
      {track && trackSrc && (
        <audio
          ref={videoRef}
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
