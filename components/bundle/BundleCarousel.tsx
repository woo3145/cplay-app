'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { Bundle } from '@/modules/bundle/domain/bundle';
import { BundleItem } from './BundleItem';
import { SwiperSlide } from 'swiper/react';
import { SoundCardCarousel } from '../carousel/SoundCardCarousel';

interface Props {
  bundles: Bundle[];
}

export const BundleCarousel = ({ bundles }: Props) => {
  const [setTrack, setPlaylist] = usePlayerStore((state) => [
    state.setTrack,
    state.setPlaylist,
  ]);

  const onTrackClick = (bundle: Bundle) => {
    setPlaylist(bundle.id, bundle.tracks);
    setTrack(0 < bundle.tracks.length ? bundle.tracks[0] : null);
  };
  return (
    <div className="py-4">
      <SoundCardCarousel>
        {bundles.map((bundle) => {
          return (
            <SwiperSlide key={bundle.id}>
              <BundleItem bundle={bundle} onClick={onTrackClick} />
            </SwiperSlide>
          );
        })}
      </SoundCardCarousel>
    </div>
  );
};
