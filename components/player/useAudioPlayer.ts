import { usePlayerStore } from '@/store/usePlayerStore';
import { useUIStatusStore } from '@/store/useUIStatusStorage';
import { RefObject, useEffect, useRef, useState } from 'react';

interface UseAudioPlayerProps {
  trackSrc: string | null;
}

// trackSrc로 오디오 객체를 만들고 playerStore의 상태를 오디오 객체와 동기화 시켜줌
export const useAudioPlayer = ({
  trackSrc,
}: UseAudioPlayerProps): RefObject<HTMLAudioElement> => {
  const {
    volume,
    isMuted,
    isPlaying,
    playlistId,
    selectedBundleId,
    setDuration,
    setCurrentTime,
  } = usePlayerStore((state) => ({
    volume: state.volume,
    isMuted: state.isMuted,
    isPlaying: state.isPlaying,
    playlistId: state.playlistId,
    selectedBundleId: state.selectedBundleId,
    setCurrentTime: state.setCurrentTime,
    setDuration: state.setDuration,
  }));
  const { playerCurrentTime, setPlayerCurrentTime } = useUIStatusStore(
    (state) => ({
      playerCurrentTime: state.playerCurrentTime,
      setPlayerCurrentTime: state.setPlayerCurrentTime,
    })
  );

  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  // 트랙/번들/플레이리스트 변경 시 audioElement 등록 && 기존 상태 유지(volume, isPlaying)
  useEffect(() => {
    if (!audioRef.current || !trackSrc) {
      return;
    }
    setPlayerCurrentTime(0);
    audioRef.current.src = trackSrc;
    audioRef.current.volume = volume;
    if (!isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {}).catch((error) => {});
      }
    }

    setAudioElement(audioRef.current);

    // eslint-disable-next-line
  }, [trackSrc, playlistId, selectedBundleId]);

  // metadata, currentTime 핸들러 등록
  useEffect(() => {
    if (!audioElement) return;
    const handleTimeUpdate = () => {
      if (!audioElement) return;
      setCurrentTime(audioElement.currentTime);
    };
    const handleLoadedMetadata = () => {
      if (!audioElement) return;
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioElement, setCurrentTime, setDuration]);

  // player slide ui의 상태를 실제 audioRef에 반영
  useEffect(() => {
    if (!audioElement) return;
    audioElement.currentTime = playerCurrentTime;
  }, [audioElement, playerCurrentTime]);

  // muted 적용
  useEffect(() => {
    if (!audioElement) return;
    audioElement.muted = isMuted;
  }, [audioElement, isMuted]);

  // volume 적용
  useEffect(() => {
    if (!audioElement) return;
    audioElement.volume = volume;
  }, [audioElement, volume]);

  // isPlaying 적용
  useEffect(() => {
    if (!audioElement) return;

    if (!isPlaying) {
      audioElement.pause();
    } else {
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {}).catch((error) => {});
      }
    }
  }, [audioElement, isPlaying]);

  return audioRef;
};
