import { SocialSignInList } from '@/app/_components/SocialSignInList';
import { BrandLogo } from '@/app/_components/atoms/BrandLogo';
import { Separater } from '@/app/_components/atoms/Separator';
import { RegisterForm } from '@/app/_components/forms/RegisterForm';
import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'JAZZiT | Register',
};

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1503528027243-2a3df3850cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

export default async function RegisterPage() {
  const providers = await getProviders();

  return (
    <div className={'flex flex-col h-full xl:flex-row'}>
      <div className="flex justify-center w-full xl:w-6/12">
        <div className="w-full max-w-md py-6 px-4 xl:px-10 xl:py-10">
          <header className="flex flex-col items-center mb-8 xl:items-start">
            <Link href="/" className="mb-8">
              <BrandLogo size="lg" />
            </Link>
            <h1 className="text-4xl font-semibold mt-8 mb-4">회원가입</h1>
            <p className="text-foreground/60">
              이미 계정이 있으신가요?{' '}
              <Link href="/signin" className="text-foreground underline">
                로그인
              </Link>
            </p>
          </header>

          <SocialSignInList providers={providers} />

          <Separater text="OR CONTINUE WITH" />

          <RegisterForm />
        </div>
      </div>

      <div className="relative hidden xl:block w-full h-screen bg-background">
        <Image
          src={SAMPLE_IMAGE}
          fill
          alt="image"
          sizes="1280px"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
}
