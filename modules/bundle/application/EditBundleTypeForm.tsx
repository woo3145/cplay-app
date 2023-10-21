'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BundleType } from '../domain/bundle';
import {
  EditBundleTypeFormData,
  EditBundleTypeFormSchema,
} from '../domain/validations/EditBundleTypeTypes';
import { editBundleTypeServerAction } from '../domain/usecases/editBundleTypeServerAction';

interface Props {
  bundleType: BundleType;
  closeModal: () => void;
}

export const EditBundleTypeForm = ({ closeModal, bundleType }: Props) => {
  const form = useForm<EditBundleTypeFormData>({
    resolver: zodResolver(EditBundleTypeFormSchema),
    defaultValues: {
      name: bundleType.name,
    },
  });

  const onSubmit: SubmitHandler<EditBundleTypeFormData> = async (data) => {
    try {
      const result = await editBundleTypeServerAction(bundleType.id, data);

      if (!result.success) {
        toast({
          variant: 'destructive',
          title: result.message,
        });
        form.reset();
        return;
      }

      toast({
        variant: 'success',
        title: '성공적으로 BundleType을 수정했습니다.',
      });

      closeModal();
    } catch (e) {
      console.log('예상치 못한 에러가 발생하였습니다.', e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit" className="mt-2">
          수정
        </Button>
      </form>
    </Form>
  );
};
