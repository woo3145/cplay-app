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
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { createTracksQueryString } from '@/lib/queryString';

interface Props {
  selectedGenres: number[];
  selectedMoods: number[];
  title?: string;
}

export const TrackFilter = ({
  selectedGenres,
  selectedMoods,
  title,
}: Props) => {
  const route = useRouter();
  const { genres, moods } = useAppStore((state) => ({
    genres: state.genres,
    moods: state.moods,
  }));

  const onClickToggleGenre = (id: number) => {
    try {
      const query = createTracksQueryString({
        genreIds: selectedGenres.includes(id)
          ? selectedGenres.filter((selectedId) => selectedId !== id)
          : [id, ...selectedGenres],
        moodIds: selectedMoods,
        title,
      });

      route.push(`/tracks?${query}`);
    } catch (e) {
      console.log('Error toggling filter', e);
    }
  };

  const onClickToggleMood = (id: number) => {
    try {
      const query = createTracksQueryString({
        genreIds: selectedGenres,
        moodIds: selectedMoods.includes(id)
          ? selectedMoods.filter((selectedId) => selectedId !== id)
          : [id, ...selectedMoods],
        title,
      });

      route.push(`/tracks?${query}`);
    } catch (e) {
      console.log('Error toggling filter', e);
    }
  };
  const onClickClearFilter = () => {
    try {
      const query = createTracksQueryString({
        genreIds: [],
        moodIds: [],
        title: '',
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
