import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatSeconds } from '@/lib/dateFormat';
import { cn } from '@/lib/utils';
import { Track } from '@/modules/track/domain/track';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Pause, Play } from 'lucide-react';
import Image from 'next/image';

interface Props {
  track: Track;
}

export const TrackListItem = ({ track }: Props) => {
  const [
    currentTrack,
    isPlaying,
    setIsPlaying,
    selectedBundleId,
    setTrack,
    playlistName,
    playlist,
    playlistId,
    setPlaylist,
  ] = usePlayerStore((state) => [
    state.currentTrack,
    state.isPlaying,
    state.setIsPlaying,
    state.selectedBundleId,
    state.setTrack,
    state.playlistName,
    state.playlist,
    state.playlistId,
    state.setPlaylist,
  ]);

  const isSelectedTrack =
    selectedBundleId === '' && currentTrack && currentTrack.id === track.id;

  const onTrackClick = () => {
    // 이미 선택 된 트랙이라면 isPlaying 토글
    if (isSelectedTrack) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (playlistId === '') {
      // 현재 선택 된 플레이리스트가 없는 경우
      setPlaylist('custom', 'custom', [track]);
    } else {
      setPlaylist(playlistId, playlistName, [
        ...playlist.filter((item) => item.id !== track.id),
        track,
      ]);
    }
    setTrack(track);
  };
  return (
    <li className="w-full py-2 px-2 space-x-4 flex items-center rounded-md text-sm cursor-pointer duration-200 hover:bg-muted">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full hover:bg-primary hover:text-primary-foreground hover:dark:bg-background hover:dark:text-foreground  w-10 h-10 p-0 shrink-0"
              variant="ghost"
              onClick={() => onTrackClick()}
            >
              {isSelectedTrack && isPlaying ? (
                <Pause className={cn('w-4 h-4', isSelectedTrack && 'block')} />
              ) : (
                <Play
                  className={cn(
                    'w-4 h-4',
                    isSelectedTrack && isPlaying && 'block'
                  )}
                />
              )}
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
};
