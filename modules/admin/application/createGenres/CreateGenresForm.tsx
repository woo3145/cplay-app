'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CreateGenresFormData,
  CreateGenresFormSchema,
} from '../../domain/genres.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createGenresServerAction } from './createGenresServerAction';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  closeModal: () => void;
}

export const CreateGenresForm = ({ closeModal }: Props) => {
  const form = useForm<CreateGenresFormData>({
    resolver: zodResolver(CreateGenresFormSchema),
    defaultValues: {
      tag: '',
      slug: '',
    },
  });

  const onSubmit: SubmitHandler<CreateGenresFormData> = async (data) => {
    try {
      const result = await createGenresServerAction(data);

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
        title: '성공적으로 Genres를 생성했습니다.',
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
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="slug" {...field} />
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
