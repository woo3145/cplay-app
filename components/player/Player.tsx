'use client';
import { usePlayerStore } from '@/store/usePlayerStore';
import { PlayerController } from './PlayerControler';

export const Player = () => {
  const track = usePlayerStore((state) => state.currentTrack);
  return (
    <div>
      <PlayerController track={track} />
    </div>
  );
};
