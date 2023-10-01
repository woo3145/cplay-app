import { Separator } from '@/components/ui/separator';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { ChangePasswordForm } from './ChangePasswordForm';

export default async function ChangePasswordPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-3xl font-medium">패스워드 변경</h3>
      </div>
      <Separator />

      <ChangePasswordForm userId={session.user.id} />
    </div>
  );
}
