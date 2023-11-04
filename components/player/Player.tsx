'use client';
import { usePlayerStore } from '@/store/usePlayerStore';
import { PlayerController } from './PlayerController';
import { TrackInfo } from './TrackInfo';
import { useRef } from 'react';
import { PlayerSideController } from './PlayerSideController';
import { useUserStore } from '@/store/useUserStore';
import { cn } from '@/lib/utils';

export const Player = () => {
  const likedTrackIds = useUserStore((state) => state.likedTracks).map(
    (track) => track.id
  );
  const { track, playlist, playlistId } = usePlayerStore((state) => ({
    track: state.currentTrack,
    playlist: state.playlist,
    playlistId: state.playlistId,
  }));
  const videoRef = useRef<HTMLAudioElement>(null);

  if (!playlist) {
    return null;
  }

  if (track) {
    track.likedByUser = likedTrackIds.includes(track.id);
  }

  return (
    <div
      className={cn(
        'fixed left-0 right-0 bottom-16 z-50 flex justify-between items-center h-16 px-4 bg-background',
        'lg:bottom-0 lg:left-56 lg:h-20',
        'landscape:bottom-0 landscape:left-56 landscape:border-l'
      )}
    >
      <TrackInfo track={track} />
      <PlayerController track={track} videoRef={videoRef} />
      <PlayerSideController track={track} videoRef={videoRef} />
    </div>
  );
};
