import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import { ChangePasswordForm } from './ChangePasswordForm';
import { getSessionUser } from '@/modules/user/application/getSessionUser';

export default async function ChangePasswordPage() {
  const user = await getSessionUser();

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
