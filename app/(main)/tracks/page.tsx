import { TrackList } from './TrackList';
import { Pagination } from './Pagination';
import { getReleasedTracksServerAction } from '@/modules/track/domain/usecases/getReleasedTracksServerAction';
import { TrackFilter } from './TrackFilter';
import { useAppStore } from '@/store/useAppStore';
import { TrackSearchBar } from './TrackSearchBar';
import { parseStringToArrayNumber } from '@/lib/queryString';

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

  // 유효하지 않은 태그는 필터링
  const selectedGenres = parseStringToArrayNumber(searchParams?.genres).filter(
    (selectedId) => genres.find((genre) => genre.id === selectedId)
  );
  const selectedMoods = parseStringToArrayNumber(searchParams?.moods).filter(
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
            selectedGenres={selectedGenres}
            selectedMoods={selectedMoods}
            title={title}
          />
          <TrackFilter
            selectedGenres={selectedGenres}
            selectedMoods={selectedMoods}
            title={title}
          />
        </div>
        <TrackList tracks={tracks} />
        <Pagination
          totalItems={count}
          take={10}
          page={isNaN(page) ? 1 : page}
          selectedGenres={selectedGenres}
          selectedMoods={selectedMoods}
          title={title}
        />
      </div>
    </div>
  );
}
