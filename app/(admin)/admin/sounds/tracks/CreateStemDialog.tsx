'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

import { CreateStemForm } from '@/modules/stem/application/CreateStemForm';
import { Track } from '@/modules/track/domain/track';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Props {
  track: Track;
}

export const CreateStemDialog = ({ track }: Props) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="w-full" asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Stem
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[660px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Add Stem</AlertDialogTitle>
        </AlertDialogHeader>

        <CreateStemForm closeModal={closeModal} track={track} />
      </AlertDialogContent>
    </AlertDialog>
  );
};
