'use client';
import { usePlayerStore } from '@/store/usePlayerStore';
import { PlayerController } from './PlayerController';
import { TrackInfo } from './TrackInfo';
import { PlayerSideController } from './PlayerSideController';
import { cn } from '@/lib/utils';
import { useUIStatusStore } from '@/store/useUIStatusStorage';
import { useAudioPlayer } from './useAudioPlayer';
import { useUserStore } from '@/store/useUserStore';
import { useEffect } from 'react';

export const Player = () => {
  const isPlayerOpen = useUIStatusStore((state) => state.isPlayerOpen);
  const likedTrack = useUserStore((state) => state.likedTracks);
  const { trackSrc, playlist, updateCurrentTrackLikedStatus } = usePlayerStore(
    (state) => ({
      trackSrc: state.trackSrc,
      playlist: state.playlist,
      updateCurrentTrackLikedStatus: state.updateCurrentTrackLikedStatus,
    })
  );
  const audioRef = useAudioPlayer({ trackSrc: trackSrc });

  // 유저의 좋아요 목록이 변경되면 트랙 좋아요 상태 업데이트
  useEffect(() => {
    updateCurrentTrackLikedStatus();
  }, [updateCurrentTrackLikedStatus, likedTrack]);

  if (!playlist) {
    return null;
  }

  // 플레이어를 닫으면 오디오와 관련된 자원들 모두 클린업
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
