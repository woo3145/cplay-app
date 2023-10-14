'use client';

import { Track } from '@/modules/track/domain/track';
import { TrackItem } from './TrackItem';
import { usePlayerStore } from '@/store/usePlayerStore';

interface Props {
  tracks: Track[];
}

export const TrackList = ({ tracks }: Props) => {
  const setTrack = usePlayerStore((state) => state.setTrack);

  const onTrackClick = (track: Track) => {
    setTrack(track);
  };
  return (
    <div className="flex items-center gap-4 overflow-x-auto py-4">
      {tracks.map((track) => {
        return (
          <TrackItem key={track.id} track={track} onClick={onTrackClick} />
        );
      })}
    </div>
  );
};
