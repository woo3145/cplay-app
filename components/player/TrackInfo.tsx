import { Track } from '@/modules/track/domain/track';
import Image from 'next/image';

interface Props {
  track: Track;
}

export const TrackInfo = ({ track }: Props) => {
  return (
    <div className="hidden md:flex shrink-0 w-1/5 gap-2">
      <div>
        <Image
          src={track.imageUrl}
          width={50}
          height={50}
          sizes="100vw"
          loading="lazy"
          className="aspect-square object-cover rounded-md"
          alt={'coverImage'}
        />
      </div>
      <div>
        <p className="">{track.title}</p>
        <p className="text-sm">{track.creator?.name}</p>
      </div>
    </div>
  );
};
