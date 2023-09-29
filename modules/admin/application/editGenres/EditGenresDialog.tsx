import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { EditGenresForm } from './EditGenresForm';
import { Genres } from '@/modules/genres/domain/genres';

interface Props {
  genres: Genres;
  children: React.ReactNode; // trigger
}

export const EditGenresDialog = ({ children, genres }: Props) => {
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
          <DialogTitle>{genres.tag}를 정말 수정하시겠습니까?</DialogTitle>
          <DialogDescription>
            기존에 사용중인 장르 태그도 모두 변경됩니다.
          </DialogDescription>
        </DialogHeader>

        <EditGenresForm closeModal={closeModal} genres={genres} />
      </DialogContent>
    </Dialog>
  );
};
