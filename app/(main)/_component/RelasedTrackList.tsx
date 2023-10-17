import { TrackList } from '@/components/track/TrackList';
import { Genre } from '@/modules/genre/domain/genre';
import { getReleasedTracksServerAction } from '@/modules/track/domain/usecases/getReleasedTracksServerAction';

interface Props {
  genre: Genre | 'all';
}

export const RelasedTrackList = async ({ genre }: Props) => {
  const tracks = await getReleasedTracksServerAction({
    genre: genre === 'all' ? 'all' : genre.slug,
  });

  return <TrackList tracks={tracks} />;
};
