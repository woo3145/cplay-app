'use client';

import { Track } from '@/modules/track/domain/track';
import { TrackItem } from './TrackItem';
import { usePlayerStore } from '@/store/usePlayerStore';
import { SoundCardCarousel } from '../carousel/SoundCardCarousel';
import { SwiperSlide } from 'swiper/react';
import { useUserStore } from '@/store/useUserStore';

interface Props {
  tracks: Track[];
}

export const TrackCarousel = ({ tracks }: Props) => {
  const likedTrackIds = useUserStore((state) => state.likedTracks).map(
    (track) => track.id
  );

  tracks.forEach(
    (track) => (track.likedByUser = likedTrackIds.includes(track.id))
  );

  const { setTrack, setPlaylist, playlistName, playlist, playlistId } =
    usePlayerStore((state) => ({
      setTrack: state.setTrack,
      playlistName: state.playlistName,
      playlist: state.playlist,
      playlistId: state.playlistId,
      setPlaylist: state.setPlaylist,
    }));

  const onTrackClick = (track: Track) => {
    if (playlistId === '') {
      // 현재 선택 된 플레이리스트가 없는 경우
      setPlaylist('custom', 'custom', [track]);
    } else {
      setPlaylist(playlistId, playlistName, [
        ...playlist.filter((item) => item.id !== track.id),
        track,
      ]);
    }
    setTrack(track);
  };

  return (
    <div className="py-4">
      <SoundCardCarousel>
        {tracks.map((track) => {
          return (
            <SwiperSlide key={track.id}>
              <TrackItem track={track} onClick={onTrackClick} />
            </SwiperSlide>
          );
        })}
      </SoundCardCarousel>
    </div>
  );
};
