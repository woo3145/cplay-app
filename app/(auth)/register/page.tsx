import { BrandLogo } from '@/components/atoms/BrandLogo';
import { SocialSignInList } from '@/components/SocialSignInList';
import { Separater } from '@/components/atoms/Separator';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { getProviders } from 'next-auth/react';
import Link from 'next/link';

export const metadata = {
  title: 'Cplay | Register',
};

export default async function RegisterPage() {
  const providers = await getProviders();

  return (
    <div className="flex flex-col items-center h-full py-6 px-4">
      <div className="w-full max-w-md">
        <header className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-8">
            <BrandLogo size="lg" />
          </Link>
          <h1 className="text-4xl font-semibold mt-8 mb-2">회원가입</h1>
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
  );
}
