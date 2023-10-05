'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { CreateMoodForm } from '../../../../modules/mood/application/CreateMoodForm';

export const CreateMoodDialog = () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Mood
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Mood</DialogTitle>
        </DialogHeader>

        <CreateMoodForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};
