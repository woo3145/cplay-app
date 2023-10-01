'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { User } from 'next-auth';
import { AvatarUpload } from './AvatarUpload';
import { useState } from 'react';
import {
  EditUserFormData,
  EditUserFormSchema,
} from '@/modules/user/domain/user.validation';
import { getPresignedUrlToAvatar } from '@/modules/upload/application/getPresignedUrlToAvatar';
import { getFileExtension } from '@/lib/utils';
import { uploadFileToPresigendUrl } from '@/modules/upload/application/uploadFileToPresigendUrl';
import { editUserServerAction } from '@/modules/user/application/editUserServerAction';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Props {
  user: User;
}

export function ProfileForm({ user }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { update: sessionUpdate } = useSession();
  const form = useForm<Omit<EditUserFormData, 'imageUrl'>>({
    resolver: zodResolver(EditUserFormSchema.omit({ imageUrl: true })),
    defaultValues: {
      name: user.name ?? '닉네임을 설정해주세요.',
    },
    mode: 'onChange',
  });

  async function onSubmit(data: Omit<EditUserFormData, 'imageUrl'>) {
    setIsLoading(true);
    try {
      let imageUrl = user.image ?? '';
      if (selectedFile) {
        const extended = getFileExtension(selectedFile.name);
        const presignedUrl = await getPresignedUrlToAvatar(
          `${user.id}-profile.${extended}`,
          selectedFile.type
        );

        imageUrl = await uploadFileToPresigendUrl(presignedUrl, selectedFile);
      }

      const result = await editUserServerAction(user.id, {
        name: data.name,
        imageUrl,
      });

      if (!result.success) {
        toast({
          variant: 'destructive',
          title: result.message,
        });
        return;
      }
      if (result.user) {
        await sessionUpdate({
          name: result.user.name,
          picture: result.user.image,
        });
        toast({
          variant: 'success',
          title: '성공적으로 프로필을 수정했습니다.',
        });
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: '예상치 못한 에러가 발생하였습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-8 flex-col md:flex-row"
      >
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

          <Button type="submit" className="ml-auto" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            프로필 업데이트
          </Button>
        </div>
      </form>
    </Form>
  );
}
