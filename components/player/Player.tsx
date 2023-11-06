'use client';
import { usePlayerStore } from '@/store/usePlayerStore';
import { PlayerController } from './PlayerController';
import { TrackInfo } from './TrackInfo';
import { useMemo } from 'react';
import { PlayerSideController } from './PlayerSideController';
import { useUserStore } from '@/store/useUserStore';
import { cn } from '@/lib/utils';
import { useUIStatusStore } from '@/store/useUIStatusStorage';
import { useAudioPlayer } from './useAudioPlayer';

export const Player = () => {
  const [isPlayerOpen] = useUIStatusStore((state) => [state.isPlayerOpen]);
  const likedTrackIds = useUserStore((state) => state.likedTracks).map(
    (track) => track.id
  );
  const { track, playlist, stemType } = usePlayerStore((state) => ({
    track: state.currentTrack,
    playlist: state.playlist,
    stemType: state.stemType,
  }));
  const trackSrc = useMemo(() => {
    if (!track || !track.stems.length) return null;
    const curStem = track.stems.filter((stem) => stem.stemType === stemType);
    return curStem.length ? curStem[0].src : null;
  }, [stemType, track]);

  const audioRef = useAudioPlayer({ trackSrc });

  if (!playlist) {
    return null;
  }

  if (track) {
    track.likedByUser = likedTrackIds.includes(track.id);
  }

  return isPlayerOpen ? (
    <div
      className={cn(
        'fixed left-0 right-0 bottom-16 z-50 flex justify-between items-center h-16 px-4 bg-background/80 ',
        'lg:bottom-0 lg:left-56 lg:h-20',
        'landscape:bottom-0 landscape:left-56 landscape:border-l'
      )}
    >
      <TrackInfo />
      <PlayerController isResponsiveUI />
      <PlayerSideController />
      <audio ref={audioRef}>
        <source type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  ) : null;
};
