'use client';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';

import { Swiper } from 'swiper/react';

import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const SoundCardCarousel = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);
  return isReady ? (
    <Swiper
      // install Swiper modules
      modules={[FreeMode, Navigation, Pagination]}
      slidesPerView={2}
      spaceBetween={20}
      slidesPerGroup={2}
      navigation
      breakpoints={{
        480: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        720: {
          slidesPerView: 4,
          spaceBetween: 20,
        },

        1280: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        1600: {
          slidesPerView: 7,
          spaceBetween: 20,
        },
        1920: {
          slidesPerView: 8,
          spaceBetween: 20,
        },
        2560: {
          slidesPerView: 10,
          spaceBetween: 20,
        },
      }}
    >
      {children}
    </Swiper>
  ) : (
    <div className="w-full flex h-48 gap-4 overflow-hidden">
      <Skeleton className="w-48 h-48 shrink-0" />
      <Skeleton className="w-48 h-48 shrink-0" />
      <Skeleton className="w-48 h-48 shrink-0" />
      <Skeleton className="w-48 h-48 shrink-0" />
      <Skeleton className="w-48 h-48 shrink-0" />
      <Skeleton className="w-48 h-48 shrink-0" />
      <Skeleton className="w-48 h-48 shrink-0" />
      <Skeleton className="w-48 h-48 shrink-0" />
      <Skeleton className="w-48 h-48 shrink-0" />
      <Skeleton className="w-48 h-48 shrink-0" />
    </div>
  );
};
