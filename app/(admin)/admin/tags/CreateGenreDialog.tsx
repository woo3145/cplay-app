'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreateGenreForm } from '@/modules/genre/application/CreateGenreForm';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

export const CreateGenreDialog = () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Genres
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Genres</DialogTitle>
        </DialogHeader>

        <CreateGenreForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};
