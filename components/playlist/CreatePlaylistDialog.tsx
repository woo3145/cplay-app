'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreatePlaylistForm } from '@/modules/playlist/application/CreatePlaylistForm';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

export const CreatePlaylistDialog = () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button variant="ghost">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Playlist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Playlist</DialogTitle>
        </DialogHeader>

        <CreatePlaylistForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};
