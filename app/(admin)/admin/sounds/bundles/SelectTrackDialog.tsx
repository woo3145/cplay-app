'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

import { Track } from '@/modules/track/domain/track';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Props {
  tracks: Track[];
  selectedTracks: Track[];
  setSelectedTrack: Dispatch<SetStateAction<Track[]>>;
}

export const SelectTrackDialog = ({
  tracks,
  selectedTracks,
  setSelectedTrack,
}: Props) => {
  const [_selectedTrackIds, _setSelectedTrackIds] = useState<number[]>(
    selectedTracks.map((item) => item.id)
  );
  const [_selectedTrack, _setSelectedTrack] = useState<Track[]>(selectedTracks);
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const onSelectTrackToggle = (track: Track) => {
    if (_selectedTrackIds.includes(track.id)) {
      _setSelectedTrackIds((prev) => prev.filter((t) => t !== track.id));
      _setSelectedTrack((prev) => prev.filter((t) => t.id !== track.id));
    } else {
      _setSelectedTrackIds((prev) => [...prev, track.id]);
      _setSelectedTrack((prev) => [...prev, track]);
    }
  };

  const onConfirm = () => {
    setSelectedTrack(_selectedTrack);
    closeModal();
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="w-full" asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Select Track
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[660px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Select Track</AlertDialogTitle>
        </AlertDialogHeader>

        <ScrollArea className="h-80">
          {tracks.map((track) => {
            return (
              <div
                className={cn(
                  'cursor-pointer',
                  _selectedTrackIds.includes(track.id) && 'text-primary'
                )}
                onClick={() => onSelectTrackToggle(track)}
                key={track.id}
              >
                {track.title}
              </div>
            );
          })}
        </ScrollArea>

        <div className="grid grid-cols-2 gap-4">
          <AlertDialogCancel>취소</AlertDialogCancel>
          <Button onClick={onConfirm}>확인</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
