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
  EditMoodFormData,
  EditMoodFormSchema,
} from '@/modules/admin/domain/mood.validation';
import { editMoodServerAction } from './editMoodServerAction';
import { Mood } from '@/modules/mood/domain/mood';

interface Props {
  mood: Mood;
  closeModal: () => void;
}

export const EditMoodForm = ({ closeModal, mood }: Props) => {
  const form = useForm<EditMoodFormData>({
    resolver: zodResolver(EditMoodFormSchema),
    defaultValues: {
      tag: mood.tag,
    },
  });

  const onSubmit: SubmitHandler<EditMoodFormData> = async (data) => {
    try {
      const result = await editMoodServerAction(mood.id, data);

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
        title: '성공적으로 Mood를 수정했습니다.',
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
          수정
        </Button>
      </form>
    </Form>
  );
};
