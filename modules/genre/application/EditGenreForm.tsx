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
import { Genre } from '../domain/genre';
import {
  EditGenreFormData,
  EditGenreFormSchema,
} from '../domain/validations/EditGenreTypes';
import { editGenreServerAction } from '../domain/usecases/editGenreServerAction';

interface Props {
  genre: Genre;
  closeModal: () => void;
}

export const EditGenreForm = ({ closeModal, genre }: Props) => {
  const form = useForm<EditGenreFormData>({
    resolver: zodResolver(EditGenreFormSchema),
    defaultValues: {
      tag: genre.tag,
      slug: genre.slug,
    },
  });

  const onSubmit: SubmitHandler<EditGenreFormData> = async (data) => {
    try {
      const result = await editGenreServerAction(genre.id, data);

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
        title: '성공적으로 장르를 수정했습니다.',
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
          수정
        </Button>
      </form>
    </Form>
  );
};
