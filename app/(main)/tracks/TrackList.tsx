'use client';
import { Button } from '@/components/ui/button';
import { createTracksQueryString } from '@/lib/queryString';
import { Track } from '@/modules/track/domain/track';
import { useRouter } from 'next/navigation';
import { TrackListItem } from './TrackListItem';

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
          return <TrackListItem key={track.id} track={track} />;
        })}
      </ul>
    </div>
  );
};
