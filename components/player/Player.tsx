'use client';
import { usePlayerStore } from '@/store/usePlayerStore';
import { PlayerController } from './PlayerControler';
import { TrackInfo } from './TrackInfo';

export const Player = () => {
  const track = usePlayerStore((state) => state.currentTrack);

  if (!track) {
    return null;
  }
  return (
    <div className="fixed bottom-0 z-50 w-full flex items-center px-4 py-2 bg-background">
      <PlayerController track={track} />
      <TrackInfo track={track} />
    </div>
  );
};
