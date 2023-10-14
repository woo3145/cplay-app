'use client';

import { Track } from '@/modules/track/domain/track';
import { usePlayerStore } from '@/store/usePlayerStore';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../ui/button';

interface Props {
  track: Track | null;
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
    if (!track?.stems) return null;
    const curStem = track.stems.filter((stem) => stem.stemType === stemType);

    return curStem.length ? curStem[0].src : null;
  }, [stemType, track]);

  const musicTimeUpdateHandler = () => {
    if (!ref.current) return;
    setCurrentTime(ref.current.currentTime);
  };

  const playClickHandler = () => {
    if (!track) return;
    console.log(ref.current?.volume);
    setIsPlaying(!isPlaying);
  };

  const metadataLoadHandler = () => {
    if (!ref.current) return;
    setDuration(ref.current.duration);
  };

  useEffect(() => {
    if (!ref.current) return;
    if (track && trackSrc) {
      ref.current.src = trackSrc;
      ref.current.volume = volume;
      if (!isPlaying) {
        ref.current.pause();
      } else {
        ref.current.play();
      }
    }
  }, [track, trackSrc, volume, isPlaying]);
  return (
    <div>
      <Button type="button" onClick={playClickHandler}>
        Play
      </Button>
      {track && trackSrc && (
        <audio
          ref={ref}
          onTimeUpdate={musicTimeUpdateHandler}
          onLoadedMetadata={metadataLoadHandler}
        >
          <source src={trackSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      <div>{currentTime}</div>
      <div>{duration}</div>
    </div>
  );
};
