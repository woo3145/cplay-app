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
import {
  CreateBundleTypeFormData,
  CreateBundleTypeFormSchema,
} from '../domain/validations/CreateBundleTypeTypes';
import { createBundleTypeServerAction } from '../domain/usecases/createBundleTypeServerAction';

interface Props {
  closeModal: () => void;
}

export const CreateBundleTypeForm = ({ closeModal }: Props) => {
  const form = useForm<CreateBundleTypeFormData>({
    resolver: zodResolver(CreateBundleTypeFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<CreateBundleTypeFormData> = async (data) => {
    try {
      const result = await createBundleTypeServerAction(data);

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
        title: '성공적으로 BundleType을 생성했습니다.',
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
          생성
        </Button>
      </form>
    </Form>
  );
};
