'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { InputErrorMessage } from '../atoms/InputErrorMessage';
import { registerUserServerAction } from '@/modules/user/application/userRegisterServerAction';
import {
  RegisterUserFormData,
  RegisterUserFormSchema,
} from '@/modules/user/domain/user.validation';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(RegisterUserFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterUserFormData> = async (data) => {
    try {
      const result = await registerUserServerAction(data);

      // serverActions 이후 클라이언트 처리
      if (!result.success) {
        console.log(result.message); // 토스트
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
        <InputErrorMessage message={errors.email?.message} />
      </div>
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
        <InputErrorMessage message={errors.password?.message} />
      </div>
      <Button type="submit" className="mt-2">
        회원가입
      </Button>
    </form>
  );
};
