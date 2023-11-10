import { TrackList } from './TrackList';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination } from './Pagination';
import { getReleasedTracksServerAction } from '@/modules/track/domain/usecases/getReleasedTracksServerAction';

export default async function TracksPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page);
  const { tracks, count } = await getReleasedTracksServerAction({
    page: isNaN(page) ? 1 : page,
  });
  return (
    <div className="flex flex-col items-center justify-between px-4">
      <div className="w-full max-w-screen-xl py-16 space-y-8">
        <div className="text-5xl font-semibold">Search</div>
        <div className="flex items-center justify-between py-4">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-2 w-4 h-4" />
            <Input
              className="h-10 max-w-xl pl-8 text-md"
              placeholder="Search title, genres, moods"
            />
          </div>
          <div>
            <Button className="">Filter</Button>
          </div>
        </div>
        <TrackList tracks={tracks} />
        <Pagination
          totalItems={count}
          take={10}
          page={isNaN(page) ? 1 : page}
        />
      </div>
    </div>
  );
}
