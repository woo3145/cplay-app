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
import { AvatarUpload } from './AvatarUpload';
import { useState } from 'react';

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name ?? '닉네임을 설정해주세요.',
    },
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(selectedFile);
    toast({
      title: '프로필 수정',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-8">
        <AvatarUpload
          initialUrl={user.image}
          user={user}
          onFileSelect={(file) => setSelectedFile(file)}
        />
        <div className="flex flex-col w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input disabled type="email" id="email" value={user.email || ''} />
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
