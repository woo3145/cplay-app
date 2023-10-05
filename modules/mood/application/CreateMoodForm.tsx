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
  CreateMoodFormData,
  CreateMoodFormSchema,
} from '../domain/validations/CreateMoodTypes';
import { createMoodServerAction } from '../domain/usecases/createMoodServerAction';

interface Props {
  closeModal: () => void;
}

export const CreateMoodForm = ({ closeModal }: Props) => {
  const form = useForm<CreateMoodFormData>({
    resolver: zodResolver(CreateMoodFormSchema),
    defaultValues: {
      tag: '',
    },
  });

  const onSubmit: SubmitHandler<CreateMoodFormData> = async (data) => {
    try {
      const result = await createMoodServerAction(data);

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
        title: '성공적으로 Mood를 생성했습니다.',
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
          name="tag"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <Input placeholder="tag" {...field} />
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
