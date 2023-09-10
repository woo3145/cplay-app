import { BrandLogo } from '@/components/atoms/BrandLogo';
import { SocialSignInList } from '@/components/SocialSignInList';
import { Separater } from '@/components/atoms/Separator';
import { getProviders } from 'next-auth/react';
import Link from 'next/link';
import { SignInForm } from '@/components/forms/SignInForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Cplay | Login',
};

export default async function LoginPage() {
  const providers = await getProviders();

  return (
    <div className="flex flex-col items-center h-full py-6 px-4">
      <div className="w-full max-w-md">
        <header className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-8">
            <BrandLogo size="lg" />
          </Link>
          <h1 className="text-4xl font-semibold mt-8 mb-2">로그인</h1>
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
  );
}
