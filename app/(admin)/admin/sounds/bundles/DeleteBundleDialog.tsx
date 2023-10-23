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
import { Bundle } from '@/modules/bundle/domain/bundle';
import { deleteBundleServerAction } from '@/modules/bundle/domain/usecases/deleteBundleServerAction';

interface Props {
  bundle: Bundle;
  children: React.ReactNode; // trigger
}

export const DeleteBundleDialog = ({ children, bundle }: Props) => {
  const onSubmit = async () => {
    try {
      const result = await deleteBundleServerAction(bundle.id);

      if (!result.success) {
        return toast({
          variant: 'destructive',
          title: result.message,
        });
      }
      toast({
        variant: 'success',
        title: `성공적으로 ${bundle.name}를 삭제했습니다.`,
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
            &apos;{bundle.name}&apos; 을 정말 삭제하시겠습니까?
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
