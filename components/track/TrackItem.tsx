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
      className={cn('space-y-3 cursor-pointer')}
      onClick={onTrackClick}
    >
      <div className="relative overflow-hidden rounded-md w-48 h-48">
        <Image
          src={track.imageUrl}
          alt={track.title}
          fill
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
          priority
          className={cn(
            'h-auto w-auto object-cover transition-all hover:scale-105 aspect-square'
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{track.title}</h3>
        <p className="text-xs text-muted-foreground">{track.creator?.name}</p>
      </div>
    </div>
  );
};
