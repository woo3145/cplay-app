import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            &apos;{genres.tag}&apos; 을 정말 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            이작업은 최소할 수 없습니다. 또한 기존에 사용중인 장르 태그가 모두
            삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
