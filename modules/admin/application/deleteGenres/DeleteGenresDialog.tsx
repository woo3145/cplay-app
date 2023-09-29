import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Genres } from '@/modules/genres/domain/genres';
import { useState } from 'react';
import { deleteGenresServerAction } from './deleteGenresServerAction';
import { toast } from '@/components/ui/use-toast';

interface Props {
  genres: Genres;
  children: React.ReactNode; // trigger
}

export const DeleteGenresDialog = ({ children, genres }: Props) => {
  const [open, setOpen] = useState(false);
  const onSubmit = async () => {
    try {
      const result = await deleteGenresServerAction({ id: genres.id });

      if (!result.success) {
        toast({
          variant: 'destructive',
          title: result.message,
        });
      }
      toast({
        variant: 'success',
        title: `성공적으로 ${genres.tag}를 삭제했습니다.`,
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: '예상치 못한 에러가 발생하였습니다.',
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{genres.tag}를 정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            기존에 사용중인 장르 태그가 제거됩니다.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant={'ghost'}>취소</Button>
          </DialogTrigger>
          <Button onClick={onSubmit}>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
