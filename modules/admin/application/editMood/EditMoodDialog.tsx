import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Mood } from '@/modules/mood/domain/mood';
import { EditMoodForm } from './EditMoodForm';

interface Props {
  mood: Mood;
  children: React.ReactNode; // trigger
}

export const EditMoodDialog = ({ children, mood }: Props) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mood.tag}를 정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            기존에 사용중인 분위기 태그가 제거됩니다.
          </DialogDescription>
        </DialogHeader>

        <EditMoodForm closeModal={closeModal} mood={mood} />
      </DialogContent>
    </Dialog>
  );
};
