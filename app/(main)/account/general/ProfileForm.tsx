'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface Props {
  user: User;
}

export function ProfileForm({ user }: Props) {
  const { data: session } = useSession();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name ?? '닉네임을 설정해주세요.',
    },
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: '프로필 수정',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-8">
        <div className="space-y-4 flex flex-col items-center">
          <Avatar className="w-48 h-48">
            <AvatarImage src={user.image ?? ''} alt="user avatar" />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <Button type="button" variant="outline">
            사진 선택
          </Button>
        </div>
        <div className="flex flex-col w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              disabled
              type="email"
              id="email"
              value={session?.user.email || ''}
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  닉네임은 30일에 한 번만 변경할 수 있습니다.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="ml-auto">
            프로필 업데이트
          </Button>
        </div>
      </form>
    </Form>
  );
}
