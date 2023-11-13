'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { TracksSearchParams } from './page';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { Badge } from '@/components/ui/badge';

interface Props {
  selectedGenres: number[];
  selectedMoods: number[];
  searchParams?: TracksSearchParams;
}

export const TrackSearchBar = ({
  selectedGenres,
  selectedMoods,
  searchParams,
}: Props) => {
  const { genres, moods } = useAppStore((state) => ({
    genres: state.genres,
    moods: state.moods,
  }));
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const createQueryString = ({
    title,
    genreIds,
    moodIds,
  }: {
    title?: string;
    genreIds?: number[];
    moodIds?: number[];
  }) => {
    const query = [];
    query.push(`page=${1}`);
    query.push(`genres=[${genreIds ? genreIds : selectedGenres}]`);
    query.push(`moods=[${moodIds ? moodIds : selectedMoods}]`);
    if (title) query.push(`title=${encodeURIComponent(title)}`);

    return query.join('&');
  };

  const handleSearch = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      router.push(`/tracks?${createQueryString({ title: searchQuery })}`);
    }
  };

  const onClickRemoveGenre = (id: number) => {
    try {
      const query = createQueryString({
        genreIds: selectedGenres.filter((selectedId) => selectedId !== id),
        moodIds: selectedMoods,
      });

      router.push(`/tracks?${query}`);
    } catch (e) {
      console.log('Error toggling filter', e);
    }
  };
  const onClickRemoveMood = (id: number) => {
    try {
      const query = createQueryString({
        genreIds: selectedGenres,
        moodIds: selectedMoods.filter((selectedId) => selectedId !== id),
      });

      router.push(`/tracks?${query}`);
    } catch (e) {
      console.log('Error toggling filter', e);
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center w-full">
        <Search className="absolute left-2 w-4 h-4" />
        <Input
          className="h-10 max-w-xl pl-8 text-md"
          placeholder="Search title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <ul className="flex flex-wrap gap-2 pt-2">
        {genres.map((genre) => {
          if (!selectedGenres.includes(genre.id)) return null;
          return (
            <li
              key={genre.id}
              className="cursor-pointer"
              onClick={() => onClickRemoveGenre(genre.id)}
            >
              <Badge className="flex items-center space-x-1">
                {genre.tag} <X className="w-4 h-4" />
              </Badge>
            </li>
          );
        })}
        {moods.map((mood) => {
          if (!selectedMoods.includes(mood.id)) return null;
          return (
            <li
              key={mood.id}
              className="cursor-pointer"
              onClick={() => onClickRemoveMood(mood.id)}
            >
              <Badge
                variant="secondary"
                className="flex items-center space-x-1"
              >
                {mood.tag} <X className="w-4 h-4" />
              </Badge>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
