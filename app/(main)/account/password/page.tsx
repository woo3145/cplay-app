import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import { ChangePasswordForm } from '../../../../modules/user/application/ChangePasswordForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { getSessionUserServerAction } from '@/modules/user/domain/usecases/getSessionUserServerAction';

export default async function ChangePasswordPage() {
  const session = await getServerSession(authOptions);

  const userResult = session
    ? await getSessionUserServerAction(session.user.id)
    : null;

  const user = userResult?.success ? userResult.data : null;

  if (!user) {
    redirect('/signin');
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-3xl font-medium">패스워드 변경</h3>
      </div>
      <Separator />

      {user.isSocialLogin ? (
        <div>소셜 로그인 된 계정입니다.</div>
      ) : (
        <ChangePasswordForm userId={user.id} />
      )}
    </div>
  );
}
