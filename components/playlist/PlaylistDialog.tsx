import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { usePlayerStore } from '@/store/usePlayerStore';
import { ListMusic, Pause, Play, X } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { Track } from '@/modules/track/domain/track';
import { toast } from '../ui/use-toast';

export const PlaylistDialog = () => {
  const {
    playlistId,
    playlist,
    currentTrack,
    setTrack,
    setPlaylist,
    isPlaying,
    setIsPlaying,
  } = usePlayerStore((state) => ({
    playlistId: state.playlistId,
    playlist: state.playlist,
    currentTrack: state.currentTrack,
    setTrack: state.setTrack,
    setPlaylist: state.setPlaylist,
    isPlaying: state.isPlaying,
    setIsPlaying: state.setIsPlaying,
  }));

  const onClickPlay = (track: Track) => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setTrack(track);
    }
  };

  const onClickRemove = (track: Track) => {
    if (!playlistId) return;
    if (currentTrack && currentTrack.id === track.id) {
      toast({
        variant: 'default',
        title: '현재 재생중인 선택된 트랙 입니다.',
      });
      return;
    }
    setPlaylist(
      playlistId,
      playlist.filter((t) => t.id !== track.id)
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="p-2 flex justify-center"
        >
          <ListMusic />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Playlist</DialogTitle>
          <DialogDescription>
            현재 재생중인 플레이리스트입니다.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          <ul className="">
            {playlist.map((track, idx) => {
              const isSelected = currentTrack && track.id === currentTrack.id;
              return (
                <li
                  key={track.id}
                  className="flex items-center space-x-2 px-2 py-0.5"
                >
                  <div
                    onClick={() => onClickPlay(track)}
                    className={cn(
                      'flex items-center w-full space-x-2 cursor-pointer group overflow-x-hidden transition-all duration-300',
                      isSelected
                        ? 'text-foreground'
                        : 'text-foreground/50 hover:text-foreground'
                    )}
                  >
                    <p>{`${idx + 1}.`}</p>
                    {isSelected && !isPlaying ? (
                      <Pause
                        className={cn(
                          'w-0 group-hover:w-4 text-primary transition-all duration-300',
                          isSelected && 'w-4'
                        )}
                      />
                    ) : (
                      <Play
                        className={cn(
                          'w-0 group-hover:w-4 text-primary transition-all duration-300',
                          isSelected && 'w-4'
                        )}
                      />
                    )}
                    <p className="w-full">{track.title}</p>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant={'ghost'}
                    className="px-2 shrink-0"
                    onClick={() => onClickRemove(track)}
                  >
                    <span className="sr-only">Delete</span>
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        </ScrollArea>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
