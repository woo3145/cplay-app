'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import Image from 'next/image';
import Link from 'next/link';

export const TrackInfo = () => {
  const track = usePlayerStore((state) => state.currentTrack);
  return (
    <Link
      href="/player"
      className="flex w-full gap-2 items-center lg:w-1/4 lg:shrink-0"
    >
      {track ? (
        <Image
          src={track.imageUrl}
          width={40}
          height={40}
          sizes="100vw"
          loading="lazy"
          className="aspect-square object-cover rounded-md"
          alt={'coverImage'}
        />
      ) : (
        <div className="w-10 h-10 aspect-square object-cover rounded-md bg-slate-300" />
      )}
      {/* track 상세페이지 이동 */}
      {track ? (
        <div>
          <div className="line-clamp-1 break-all underline-offset-4 font-medium text-sm">
            {track.title}
          </div>
          <p className="text-xs text-muted-foreground">
            {track ? track.creator?.name : ''}
          </p>
        </div>
      ) : (
        <p className="line-clamp-1 break-all font-medium text-sm">
          재생 할 곡이 없습니다.
        </p>
      )}
    </Link>
  );
};
