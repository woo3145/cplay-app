'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerUserServerAction } from '@/modules/auth/application/userRegisterServerAction';
import {
  RegisterUserFormData,
  RegisterUserFormSchema,
} from '@/modules/auth/domain/user.auth.validation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';

export const RegisterForm = () => {
  const form = useForm<RegisterUserFormData>({
    resolver: zodResolver(RegisterUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterUserFormData> = async (data) => {
    try {
      const result = await registerUserServerAction(data);

      // serverActions 이후 클라이언트 처리
      if (!result.success) {
        toast({
          variant: 'destructive',
          title: result.message,
        });
        return;
      }
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch (e) {
      console.log('예상치 못한 에러: ', e);
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
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>패스워드</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="mt-2">
          회원가입
        </Button>
      </form>
    </Form>
  );
};
