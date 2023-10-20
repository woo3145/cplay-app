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
import { BundleType } from '@/modules/bundle/domain/bundle';
import { deleteBundleTypeServerAction } from '@/modules/bundle/domain/usecases/deleteBundleTypeServerAction';

interface Props {
  bundleType: BundleType;
  children: React.ReactNode; // trigger
}

export const DeleteBundleTypeDialog = ({ children, bundleType }: Props) => {
  const onSubmit = async () => {
    try {
      const result = await deleteBundleTypeServerAction(bundleType.id);

      if (!result.success) {
        return toast({
          variant: 'destructive',
          title: result.message,
        });
      }
      toast({
        variant: 'success',
        title: `성공적으로 ${bundleType.name}을 삭제했습니다.`,
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
            &apos;{bundleType.name}&apos; 을 정말 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            이작업은 취소할 수 없습니다. 또한 기존에 사용중인 번들 타입 태그가
            모두 삭제됩니다.
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
