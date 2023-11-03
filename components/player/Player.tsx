'use client';
import { usePlayerStore } from '@/store/usePlayerStore';
import { PlayerController } from './PlayerController';
import { TrackInfo } from './TrackInfo';
import { useRef } from 'react';
import { PlayerSideController } from './PlayerSideController';
import { useUserStore } from '@/store/useUserStore';

export const Player = () => {
  const likedTrackIds = useUserStore((state) => state.likedTracks).map(
    (track) => track.id
  );
  const { track, playlist } = usePlayerStore((state) => ({
    track: state.currentTrack,
    playlist: state.playlist,
  }));
  const videoRef = useRef<HTMLAudioElement>(null);

  if (!playlist) {
    return null;
  }

  if (track) {
    track.likedByUser = likedTrackIds.includes(track.id);
  }

  return (
    <div className="fixed bottom-16 sm:bottom-20 lg:bottom-0 z-50 w-full h-20 flex justify-between items-center px-4 bg-background">
      <TrackInfo track={track} />
      {track ? <PlayerController track={track} videoRef={videoRef} /> : null}
      <PlayerSideController track={track} videoRef={videoRef} />
    </div>
  );
};
