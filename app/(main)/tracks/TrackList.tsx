'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatSeconds } from '@/lib/dateFormat';
import { createTracksQueryString } from '@/lib/queryString';
import { Track } from '@/modules/track/domain/track';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  tracks: Track[];
}
export const TrackList = ({ tracks }: Props) => {
  const router = useRouter();
  const onClickClearFilter = () => {
    try {
      const query = createTracksQueryString({
        genreIds: [],
        moodIds: [],
        title: '',
      });

      router.push(`/tracks?${query}`);
    } catch (e) {
      console.log('Error toggling filter', e);
    }
  };

  if (tracks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-4 space-y-2">
        <p className="text-xl">😢 일치하는 트랙이 없습니다.</p>
        <p className="text-muted-foreground">
          더 적은 수의 필터를 사용해보세요.
        </p>
        <Button onClick={() => onClickClearFilter()}>Clear Filter</Button>
      </div>
    );
  }
  return (
    <div>
      <div className="w-full py-2 px-2 space-x-4 flex items-center rounded-md text-sm">
        <p className="w-full">track</p>
        <p className="w-20 shrink-0 hidden lg:block">length</p>
        <p className="w-16 shrink-0 hidden lg:block">bpm</p>
        <p className="w-32 shrink-0 hidden lg:block">key</p>
      </div>
      <ul>
        {tracks.map((track) => {
          return (
            <li
              key={track.id}
              className="w-full py-2 px-2 space-x-4 flex items-center rounded-md text-sm cursor-pointer duration-200 hover:bg-muted"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="rounded-full hover:bg-background w-10 h-10 p-0 shrink-0"
                      variant="ghost"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Play</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Image
                src={track.imageUrl}
                width={200}
                height={200}
                alt={track.title}
                className="w-10 h-10 rounded-md aspect-square"
              />
              <div className="w-full space-y-1">
                <p className="break-all line-clamp-1">{track.title}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {track.genres.map((genre) => {
                    return (
                      <Badge
                        key={genre.id}
                        variant="outline"
                        className="text-xs py-0.5 px-2"
                      >
                        {genre.tag}
                      </Badge>
                    );
                  })}
                  {track.moods.map((mood) => {
                    return (
                      <Badge key={mood.id} variant="secondary">
                        {mood.tag}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <p className="w-20 shrink-0 hidden lg:block">
                {formatSeconds(track.length)}
              </p>
              <p className="w-16 shrink-0 hidden lg:block">{track.bpm}</p>
              <p className="w-32 shrink-0 hidden lg:block">{track.key}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
