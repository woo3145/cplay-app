import { BrandLogo } from '@/components/atoms/BrandLogo';
import { SocialSignInList } from '@/components/SocialSignInList';
import { Separater } from '@/components/atoms/Separator';
import { getProviders } from 'next-auth/react';
import Link from 'next/link';
import { SignInForm } from '@/components/forms/SignInForm';
import Image from 'next/image';

export const metadata = {
  title: 'Cplay | Login',
};

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1503528290183-6e934b7d6981?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

export default async function LoginPage() {
  const providers = await getProviders();

  return (
    <div className={'flex flex-col h-full xl:flex-row'}>
      <div className="flex justify-center w-full xl:w-6/12">
        <div className="w-full max-w-md py-6 px-4 xl:px-10 xl:py-10">
          <header className="flex flex-col items-center mb-8 xl:items-start">
            <Link href="/" className="mb-8">
              <BrandLogo size="lg" />
            </Link>
            <h1 className="text-4xl font-semibold mt-8 mb-4">로그인</h1>
            <p className="text-foreground/60">
              아직 회원이 아닌가요?{' '}
              <Link href="/register" className="text-foreground underline">
                회원가입
              </Link>
            </p>
          </header>

          <SocialSignInList providers={providers} />

          <Separater text="OR CONTINUE WITH" />

          <SignInForm />
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
