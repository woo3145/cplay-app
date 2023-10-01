'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  ChangePasswordFormData,
  ChangePasswordFormSchema,
  EditUserFormSchema,
} from '@/modules/user/domain/user.validation';
import { Loader2 } from 'lucide-react';
import { changePasswordServerAction } from '@/modules/user/application/changePasswordServerAction';

interface Props {
  userId: string;
}

export function ChangePasswordForm({ userId }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(data: ChangePasswordFormData) {
    setIsLoading(true);

    try {
      const result = await changePasswordServerAction(userId, data);
      if (!result.success) {
        toast({
          variant: 'destructive',
          title: result.message,
        });
        return;
      }

      toast({
        variant: 'success',
        title: '성공적으로 패스워드를 변경했습니다.',
      });
      form.reset();
    } catch (e) {
      toast({
        variant: 'destructive',
        title: '예상치 못한 에러가 발생하였습니다.',
      });
    } finally {
      setIsLoading(false);
      form.resetField('newPassword');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-8 flex-col md:flex-row max-w-xl"
      >
        <div className="flex flex-col w-full space-y-4">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>기존 패스워드</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>새 패스워드</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="ml-auto" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            패스워드 변경
          </Button>
        </div>
      </form>
    </Form>
  );
}
