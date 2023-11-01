'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { Bundle } from '@/modules/bundle/domain/bundle';
import { BundleItem } from './BundleItem';
import { SwiperSlide } from 'swiper/react';
import { SoundCardCarousel } from '../carousel/SoundCardCarousel';
import { useUserStore } from '@/store/useUserStore';

interface Props {
  bundles: Bundle[];
}

export const BundleCarousel = ({ bundles }: Props) => {
  const likedBundleIds = useUserStore((state) => state.likedBundles).map(
    (bundle) => bundle.id
  );

  bundles.forEach(
    (bundle) => (bundle.likedByUser = likedBundleIds.includes(bundle.id))
  );

  const [setTrack, setPlaylist] = usePlayerStore((state) => [
    state.setTrack,
    state.setPlaylist,
  ]);

  const onBundleClick = (bundle: Bundle) => {
    setPlaylist('custom', bundle.name, bundle.tracks, bundle.id.toString());
    setTrack(0 < bundle.tracks.length ? bundle.tracks[0] : null);
  };
  return (
    <div className="py-4">
      <SoundCardCarousel>
        {bundles.map((bundle) => {
          return (
            <SwiperSlide key={bundle.id}>
              <BundleItem bundle={bundle} onClick={onBundleClick} />
            </SwiperSlide>
          );
        })}
      </SoundCardCarousel>
    </div>
  );
};
