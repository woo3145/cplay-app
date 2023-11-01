import { toast } from '@/components/ui/use-toast';
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
import { UserPlaylist } from '@/modules/playlist/domain/playlist';
import { deletePlaylistServerAction } from '@/modules/playlist/domain/usecases/deletePlaylistServerAction';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  playlist: UserPlaylist;
  children: React.ReactNode; // trigger
}

export const DeletePlaylistDialog = ({ children, playlist }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const onSubmit = async () => {
    if (!session?.user) {
      return toast({
        variant: 'destructive',
        title: '로그인이 필요합니다.',
      });
    }
    try {
      const result = await deletePlaylistServerAction(
        playlist.id,
        session.user.id
      );

      if (!result.success) {
        return toast({
          variant: 'destructive',
          title: result.message,
        });
      }
      toast({
        variant: 'success',
        title: `성공적으로 ${playlist.name}를 삭제했습니다.`,
      });
      router.replace('/');
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
            &apos;{playlist.name}&apos; 을 정말 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            이작업은 취소할 수 없습니다. 또한 서버에서 해당 데이터가 제거됩니다.
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
