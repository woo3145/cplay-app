import { TrackList } from './TrackList';
import { Pagination } from './Pagination';
import { getReleasedTracksServerAction } from '@/modules/track/domain/usecases/getReleasedTracksServerAction';
import { TrackFilter } from './TrackFilter';
import { useAppStore } from '@/store/useAppStore';
import { TrackSearchBar } from './TrackSearchBar';

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
          <TrackSearchBar
            searchParams={searchParams}
            selectedGenres={selectedGenres}
            selectedMoods={selectedMoods}
          />
          <TrackFilter
            selectedGenres={selectedGenres}
            selectedMoods={selectedMoods}
            searchParams={searchParams}
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
