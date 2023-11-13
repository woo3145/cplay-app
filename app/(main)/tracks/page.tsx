import { TrackList } from './TrackList';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination } from './Pagination';
import { getReleasedTracksServerAction } from '@/modules/track/domain/usecases/getReleasedTracksServerAction';
import { TrackFilter } from './TrackFilter';
import { useAppStore } from '@/store/useAppStore';

export interface TracksSearchParams {
  page?: string;
  title?: string;
  genres?: string[];
  moods?: string[];
}

export default async function TracksPage({
  searchParams,
}: {
  searchParams?: TracksSearchParams;
}) {
  const genres = useAppStore.getState().genres;
  const moods = useAppStore.getState().moods;
  const page = Number(searchParams?.page);
  const title = searchParams?.title ? searchParams.title.toString() : undefined;
  const parseArrayParam = (param?: string | string[]): number[] => {
    if (!param) return [];
    if (Array.isArray(param)) {
      return param.map(Number).filter((item) => !isNaN(item));
    }
    try {
      const parsed = JSON.parse(param);
      return Array.isArray(parsed)
        ? parsed.map(Number).filter((item) => !isNaN(item))
        : [];
    } catch (e) {
      return [];
    }
  };
  // 유효하지 않은 태그는 필터링
  const selectedGenres = parseArrayParam(searchParams?.genres).filter(
    (selectedId) => genres.find((genre) => genre.id === selectedId)
  );
  const selectedMoods = parseArrayParam(searchParams?.moods).filter(
    (selectedId) => moods.find((mood) => mood.id === selectedId)
  );

  const { tracks, count } = await getReleasedTracksServerAction({
    page: isNaN(page) ? 1 : page,
    genres: selectedGenres,
    moods: selectedMoods,
    title: title,
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
          <TrackFilter
            selectedGenres={selectedGenres}
            selectedMoods={selectedMoods}
          />
        </div>
        <TrackList tracks={tracks} />
        <Pagination
          totalItems={count}
          take={10}
          page={isNaN(page) ? 1 : page}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
}
