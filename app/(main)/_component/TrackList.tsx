import { cn } from '@/lib/utils';
import { Genre } from '@/modules/genre/domain/genre';
import { getReleasedTracksServerAction } from '@/modules/track/domain/usecases/getReleasedTracksServerAction';
import Image from 'next/image';

interface Props {
  genre: Genre | 'all';
}

export const TrackList = async ({ genre }: Props) => {
  const tracks = await getReleasedTracksServerAction({
    genre: genre === 'all' ? 'all' : genre.slug,
  });

  return (
    <div className="flex items-center gap-4 overflow-x-auto py-4">
      {tracks.map((track) => {
        return (
          <div key={track.title} className={cn('space-y-3 cursor-pointer')}>
            <div className="relative overflow-hidden rounded-md w-48 h-48">
              <Image
                src={track.imageUrl}
                alt={track.title}
                fill
                className={cn(
                  'h-auto w-auto object-cover transition-all hover:scale-105 aspect-square'
                )}
              />
            </div>
            <div className="space-y-1 text-sm">
              <h3 className="font-medium leading-none">{track.title}</h3>
              <p className="text-xs text-muted-foreground">
                {track.creator?.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
