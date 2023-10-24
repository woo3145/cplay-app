import { cn } from '@/lib/utils';
import { Track } from '@/modules/track/domain/track';
import Image from 'next/image';

interface Props {
  track: Track;
  onClick: (track: Track) => void;
}

export const TrackItem = ({ track, onClick }: Props) => {
  const onTrackClick = () => {
    onClick(track);
  };
  return (
    <div
      key={track.title}
      className={cn('space-y-3 cursor-pointer w-full shrink-0')}
      onClick={onTrackClick}
    >
      <Image
        src={track.imageUrl}
        alt={track.title}
        width={256}
        height={256}
        className={cn(
          'w-full object-cover transition-all hover:scale-105 aspect-square rounded-md'
        )}
      />
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{track.title}</h3>
        <p className="text-xs text-muted-foreground">{track.creator?.name}</p>
      </div>
    </div>
  );
};
