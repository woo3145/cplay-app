import { Button } from '@/components/ui/button';
import { formatSeconds } from '@/lib/dateFormat';
import { cn } from '@/lib/utils';
import { Track } from '@/modules/track/domain/track';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Play, Pause, X } from 'lucide-react';
import Image from 'next/image';

interface Props {
  track: Track;
  isSelected?: boolean | null;
  onClickPlay: (track: Track) => void;
  onClickRemove?: (track: Track) => void;
}

export const PlaylistItem = ({
  track,
  isSelected,
  onClickPlay,
  onClickRemove,
}: Props) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  return (
    <div className="flex items-center w-full gap-2">
      <div
        className={cn(
          'group flex items-center w-full px-4 py-1 gap-2 cursor-pointer rounded-md',
          isSelected ? 'bg-muted' : 'hover:bg-muted'
        )}
        onClick={() => onClickPlay(track)}
      >
        {isSelected && !isPlaying ? (
          <Pause
            className={cn(
              'w-0 group-hover:w-5 text-primary transition-all duration-300',
              isSelected && 'w-5'
            )}
          />
        ) : (
          <Play
            className={cn(
              'w-0 group-hover:w-5 text-primary transition-all duration-300',
              isSelected && 'w-5'
            )}
          />
        )}
        <Image
          src={track.imageUrl}
          alt="trackCoverImage"
          width={40}
          height={40}
          className="aspect-square rounded-md"
        />
        <span className="w-full text-sm md:text-md break-all line-clamp-1">
          {track.title}
          {track.title}
        </span>
        <span className="text-muted-foreground text-xs md:text-sm">
          {formatSeconds(track.length)}
        </span>
      </div>
      {onClickRemove ? (
        <Button
          type="button"
          size="icon"
          variant={'ghost'}
          className="px-2 py-1 shrink-0"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onClickRemove(track);
          }}
        >
          <span className="sr-only">Delete</span>
          <X className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
};
