import { redirect } from 'next/navigation';
import { ClosePlayerTrigger } from './ClosePlayerTrigger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/');
  }
  return (
    <div>
      {children}
      <ClosePlayerTrigger />
    </div>
  );
}
