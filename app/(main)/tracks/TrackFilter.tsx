'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store/useAppStore';
import { TracksSearchParams } from './page';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Props {
  selectedGenres: number[];
  selectedMoods: number[];
  searchParams?: TracksSearchParams;
}

export const TrackFilter = ({
  selectedGenres,
  selectedMoods,
  searchParams,
}: Props) => {
  const route = useRouter();
  const { genres, moods } = useAppStore((state) => ({
    genres: state.genres,
    moods: state.moods,
  }));
  const createQueryString = ({
    genreIds,
    moodIds,
  }: {
    genreIds: number[];
    moodIds: number[];
  }) => {
    const query = [];
    if (genreIds) query.push(`genres=[${genreIds}]`);
    if (moodIds) query.push(`moods=[${moodIds}]`);
    if (searchParams?.title)
      query.push(`title=${encodeURIComponent(searchParams.title)}`);
    if (searchParams?.page) query.push(`page=${searchParams.page}`);

    return query.join('&');
  };

  const onClickToggleGenre = (id: number) => {
    try {
      // 만약 queryString에 유효하지 않은 genre.id가 존재한다면 없애줌
      const _selectedGenres = selectedGenres.filter((item) =>
        genres.find((genre) => genre.id === item)
      );
      const query = createQueryString({
        genreIds: _selectedGenres.includes(id)
          ? _selectedGenres.filter((selectedId) => selectedId !== id)
          : [id, ..._selectedGenres],
        moodIds: selectedMoods,
      });

      route.push(`/tracks?${query}`);
    } catch (e) {
      console.log('Error toggling filter', e);
    }
  };

  const onClickToggleMood = (id: number) => {
    try {
      // 만약 queryString에 유효하지 않은 genre.id가 존재한다면 없애줌
      const _selectedMoods = selectedMoods.filter((item) =>
        moods.find((mood) => mood.id === item)
      );
      const query = createQueryString({
        genreIds: selectedGenres,
        moodIds: _selectedMoods.includes(id)
          ? _selectedMoods.filter((selectedId) => selectedId !== id)
          : [id, ..._selectedMoods],
      });

      route.push(`/tracks?${query}`);
    } catch (e) {
      console.log('Error toggling filter', e);
    }
  };
  const onClickClearFilter = () => {
    try {
      const query = createQueryString({
        genreIds: [],
        moodIds: [],
      });

      route.push(`/tracks?${query}`);
    } catch (e) {
      console.log('Error toggling filter', e);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filter</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Tabs defaultValue="genres" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-background">
            <TabsTrigger value="genres">Genres</TabsTrigger>
            <TabsTrigger value="moods">Moods</TabsTrigger>
          </TabsList>
          <TabsContent value="genres">
            <ul className="flex flex-wrap gap-1">
              {genres.map((genre) => {
                const isSelected =
                  selectedGenres && selectedGenres.includes(genre.id);
                return (
                  <li
                    key={genre.id}
                    onClick={() => onClickToggleGenre(genre.id)}
                  >
                    <Badge
                      variant={isSelected ? 'default' : 'outline'}
                      className={cn(
                        'cursor-pointer',
                        !isSelected && 'hover:bg-muted'
                      )}
                    >
                      {genre.tag}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          </TabsContent>
          <TabsContent value="moods">
            <ul className="flex flex-wrap gap-1">
              {moods.map((mood) => {
                const isSelected =
                  selectedMoods && selectedMoods.includes(mood.id);
                return (
                  <li key={mood.id} onClick={() => onClickToggleMood(mood.id)}>
                    <Badge
                      variant={isSelected ? 'default' : 'outline'}
                      className={cn(
                        'cursor-pointer',
                        !isSelected && 'hover:bg-muted'
                      )}
                    >
                      {mood.tag}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          </TabsContent>
        </Tabs>
        <Button
          onClick={() => onClickClearFilter()}
          className="w-full mt-4 text-sm h-8"
          variant="ghost"
        >
          Clear
        </Button>
      </PopoverContent>
    </Popover>
  );
};
