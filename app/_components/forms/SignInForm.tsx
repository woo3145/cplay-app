'use client';

import { RegisterUserInput } from '@/app/(auth)/register/_actions';
import { RegisterUserFormSchema } from '@/libs/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { useRouter } from 'next/navigation';
import { InputErrorMessage } from '../atoms/InputErrorMessage';

export const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterUserInput> = async (data) => {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        console.log(result.error);
        reset({
          password: '',
        });
        return;
      }

      router.replace('/');
    } catch (e) {
      console.log('예상치 못한 에러: ', e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-2"
    >
      <div>
        <label htmlFor="email" className="text-sm">
          이메일
        </label>
        <Input
          type="email"
          placeholder="Email"
          {...register('email')}
          className="mt-1"
        />
      </div>
      <InputErrorMessage message={errors.email?.message} />
      <div>
        <label htmlFor="password" className="text-sm">
          패스워드
        </label>
        <Input
          type="password"
          placeholder="Password"
          {...register('password')}
          className="mt-1"
        />
      </div>
      <InputErrorMessage message={errors.password?.message} />
      <Button type="submit" className="mt-2">
        로그인
      </Button>
    </form>
  );
};
