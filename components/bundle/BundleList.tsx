'use client';

import { Track } from '@/modules/track/domain/track';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Bundle } from '@/modules/bundle/domain/bundle';
import { BundleItem } from './BundleItem';

interface Props {
  bundles: Bundle[];
}

export const BundleList = ({ bundles }: Props) => {
  const [setTrack, setPlaylist] = usePlayerStore((state) => [
    state.setTrack,
    state.setPlaylist,
  ]);

  const onTrackClick = (bundle: Bundle) => {
    setPlaylist(bundle.id, bundle.tracks);
    setTrack(0 < bundle.tracks.length ? bundle.tracks[0] : null);
  };
  return (
    <div className="flex gap-4 overflow-x-auto py-4">
      {bundles.map((bundle) => {
        return (
          <BundleItem key={bundle.id} bundle={bundle} onClick={onTrackClick} />
        );
      })}
    </div>
  );
};
