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
  EditPlaylistFormData,
  EditPlaylistFormSchema,
} from '../domain/validations/EditPlaylistTypes';
import { UserPlaylist } from '../domain/playlist';
import { editPlaylistServerAction } from '../domain/usecases/editPlaylistServerAction';
import { useSession } from 'next-auth/react';

interface Props {
  playlist: UserPlaylist;
}

export const EditPlaylistNameForm = ({ playlist }: Props) => {
  const { data: session } = useSession();
  const form = useForm<EditPlaylistFormData>({
    resolver: zodResolver(EditPlaylistFormSchema),
    defaultValues: {
      name: playlist.name,
    },
  });

  const onSubmit: SubmitHandler<EditPlaylistFormData> = async (data) => {
    if (!session?.user) {
      return toast({
        variant: 'destructive',
        title: '로그인이 필요합니다.',
      });
    }
    try {
      const result = await editPlaylistServerAction(playlist.id, {
        name: data.name,
        userId: session.user.id,
        trackIds: playlist.tracks.map((item) => item.id),
      });

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
        title: '성공적으로 플레이리스트를 수정했습니다.',
      });
    } catch (e) {
      console.log('예상치 못한 에러가 발생하였습니다.', e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex items-center gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="name"
                    className="text-4xl h-14"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <Button
          type="submit"
          variant="ghost"
          className="shrink-0 px-12 h-14 text-lg"
        >
          수정
        </Button>
      </form>
    </Form>
  );
};
