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
  CreatePlaylistFormData,
  CreatePlaylistFormSchema,
} from '../domain/validations/CreatePlaylistTypes';
import { createPlaylistServerAction } from '../domain/usecases/createPlaylistServerAction';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  closeModal: () => void;
}

export const CreatePlaylistForm = ({ closeModal }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<CreatePlaylistFormData>({
    resolver: zodResolver(CreatePlaylistFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<CreatePlaylistFormData> = async (data) => {
    if (!session?.user) {
      toast({
        variant: 'destructive',
        title: '로그인이 필요합니다.',
      });
      return;
    }
    try {
      const result = await createPlaylistServerAction({
        name: data.name,
        userId: session.user.id,
        trackIds: [],
      });

      if (!result.success) {
        toast({
          variant: 'destructive',
          title: result.error,
        });
        form.reset();
        return;
      }
      const playlist = result.data;

      toast({
        variant: 'success',
        title: '성공적으로 Playlists를 생성했습니다.',
      });
      if (playlist.id) {
        router.push(`/playlists/${playlist.id}`);
      }

      closeModal();
    } catch (e) {
      toast({
        variant: 'destructive',
        title: '예상치 못한 에러가 발생하였습니다.',
      });
      form.reset();
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
