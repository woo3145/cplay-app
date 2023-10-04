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
import { toast } from '@/components/ui/use-toast';
import { deleteGenreServerAction } from '@/modules/genre/domain/usecases/deleteGenreServerAction';
import { Genre } from '@/modules/genre/domain/genre';

interface Props {
  genre: Genre;
  children: React.ReactNode; // trigger
}

export const DeleteGenreDialog = ({ children, genre }: Props) => {
  const onSubmit = async () => {
    try {
      const result = await deleteGenreServerAction(genre.id);

      if (!result.success) {
        return toast({
          variant: 'destructive',
          title: result.message,
        });
      }
      toast({
        variant: 'success',
        title: `성공적으로 ${genre.tag}를 삭제했습니다.`,
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: '예상치 못한 에러가 발생하였습니다.',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            &apos;{genre.tag}&apos; 을 정말 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            이작업은 취소할 수 없습니다. 또한 기존에 사용중인 장르 태그가 모두
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
