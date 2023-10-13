import { getSessionUserServerAction } from '@/modules/user/domain/usecases/getSessionUserServerAction';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUserServerAction();

  if (user) {
    redirect('/');
  }
  return <div>{children}</div>;
}
