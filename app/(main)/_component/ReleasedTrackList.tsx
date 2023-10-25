import { authOptions } from '@/api/auth/[...nextauth]/route';
import { TrackCarousel } from '@/components/track/TrackCarousel';
import { Genre } from '@/modules/genre/domain/genre';
import { getReleasedTracksServerAction } from '@/modules/track/domain/usecases/getReleasedTracksServerAction';
import { getServerSession } from 'next-auth';

interface Props {
  genre: Genre | 'all';
}

export const RelasedTrackList = async ({ genre }: Props) => {
  const session = await getServerSession(authOptions);

  const tracks = await getReleasedTracksServerAction(
    session ? session.user.id : null,
    {
      genre: genre === 'all' ? 'all' : genre.slug,
    }
  );

  return <TrackCarousel tracks={tracks} />;
};
