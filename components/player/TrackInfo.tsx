import { Track } from '@/modules/track/domain/track';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  track: Track | null;
}

export const TrackInfo = ({ track }: Props) => {
  return (
    <div className="hidden lg:flex shrink-0 w-1/4 gap-2 items-center">
      <Link href="/" className="shrink-0">
        {track ? (
          <Image
            src={track.imageUrl}
            width={50}
            height={50}
            sizes="100vw"
            loading="lazy"
            className="aspect-square object-cover rounded-md"
            alt={'coverImage'}
          />
        ) : (
          <div className="w-12 h-12 aspect-square object-cover rounded-md bg-slate-300" />
        )}
      </Link>
      <div>
        {/* track 상세페이지 이동 */}
        <Link
          href="/"
          className="line-clamp-1 break-all hover:underline underline-offset-4 font-medium"
        >
          {track ? track.title : '재생 할 곡이 없습니다.'}
        </Link>
        <p className="text-xs text-muted-foreground">
          {track ? track.creator?.name : ''}
        </p>
      </div>
    </div>
  );
};
