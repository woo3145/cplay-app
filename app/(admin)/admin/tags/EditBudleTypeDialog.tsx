import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { BundleType } from '@/modules/bundle/domain/bundle';
import { EditBundleTypeForm } from '@/modules/bundle/application/EditBundleTypeForm';

interface Props {
  bundleType: BundleType;
  children: React.ReactNode; // trigger
}

export const EditBundleTypeDialog = ({ children, bundleType }: Props) => {
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
          <DialogTitle>{bundleType.name}를 정말 수정하시겠습니까?</DialogTitle>
          <DialogDescription>
            기존에 사용중인 번들 타입 태그도 모두 변경됩니다.
          </DialogDescription>
        </DialogHeader>

        <EditBundleTypeForm closeModal={closeModal} bundleType={bundleType} />
      </DialogContent>
    </Dialog>
  );
};
