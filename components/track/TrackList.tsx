'use client';

import { Track } from '@/modules/track/domain/track';
import { TrackItem } from './TrackItem';
import { usePlayerStore } from '@/store/usePlayerStore';

interface Props {
  tracks: Track[];
}

export const TrackList = ({ tracks }: Props) => {
  const { setTrack, setPlaylist, playlist, playlistId } = usePlayerStore(
    (state) => ({
      setTrack: state.setTrack,
      playlist: state.playlist,
      playlistId: state.playlistId,
      setPlaylist: state.setPlaylist,
    })
  );

  const onTrackClick = (track: Track) => {
    if (playlistId === null || playlist.length === 0) {
      setPlaylist(0, [track]);
    } else {
      setPlaylist(playlistId, [
        ...playlist.filter((item) => item.id !== track.id),
        track,
      ]);
    }
    setTrack(track);
  };
  return (
    <div className="flex gap-4 overflow-x-auto py-4">
      {tracks.map((track) => {
        return (
          <TrackItem key={track.id} track={track} onClick={onTrackClick} />
        );
      })}
    </div>
  );
};
