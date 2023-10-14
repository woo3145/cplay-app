import { TrackList } from '@/components/track/TrackList';
import { cn } from '@/lib/utils';
import { Genre } from '@/modules/genre/domain/genre';
import { getReleasedTracksServerAction } from '@/modules/track/domain/usecases/getReleasedTracksServerAction';
import Image from 'next/image';

interface Props {
  genre: Genre | 'all';
}

export const RelasedTrackList = async ({ genre }: Props) => {
  const tracks = await getReleasedTracksServerAction({
    genre: genre === 'all' ? 'all' : genre.slug,
  });

  return <TrackList tracks={tracks} />;
};
