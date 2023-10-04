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
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { editUserServerAction } from '@/modules/user/domain/usecases/editUserServerAction';
import {
  EditUserFormData,
  EditUserFormSchema,
} from '../domain/validations/EditUserTypes';
import { AvatarFileSelector } from '@/app/(main)/account/general/AvatarFileSelector';
import { useUploadImage } from '@/modules/upload/application/useUploadImage';
import { SessionUser } from '../domain/user';

interface Props {
  user: SessionUser;
}

export function EditUserForm({ user }: Props) {
  const form = useForm<EditUserFormData>({
    resolver: zodResolver(EditUserFormSchema),
    defaultValues: {
      name: user.name ?? '닉네임을 설정해주세요.',
    },
    mode: 'onChange',
  });
  const { update: sessionUpdate } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const { selectedFile, setSelectedFile, uploadImage } = useUploadImage(
    user.id
  );

  async function onSubmit(data: EditUserFormData) {
    setIsLoading(true);
    try {
      let imageUrl = user.image ?? '';

      if (selectedFile) {
        imageUrl = (await uploadImage()) ?? imageUrl;
      }

      const result = await editUserServerAction(user.id, {
        name: data.name,
        image: imageUrl,
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
        <AvatarFileSelector
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
