'use client';
import { usePlayerStore } from '@/store/usePlayerStore';
import { PlayerController } from './PlayerController';
import { TrackInfo } from './TrackInfo';
import { useMemo, useRef } from 'react';
import { PlayerSideController } from './PlayerSideController';

export const Player = () => {
  const { track, stemType } = usePlayerStore((state) => ({
    track: state.currentTrack,
    stemType: state.stemType,
  }));

  const videoRef = useRef<HTMLAudioElement>(null);
  if (!track) {
    return null;
  }
  return (
    <div className="fixed bottom-0 z-50 w-full flex justify-between items-center px-4 py-2 bg-background">
      <TrackInfo track={track} />
      <PlayerController track={track} videoRef={videoRef} />
      <PlayerSideController track={track} videoRef={videoRef} />
    </div>
  );
};
