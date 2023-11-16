import { Separator } from '@/components/ui/separator';
import { EditUserForm } from '../../../../modules/user/application/EditUserForm';
import { redirect } from 'next/navigation';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getSessionUserServerAction } from '@/modules/user/domain/usecases/getSessionUserServerAction';

export default async function AccountGeneralPage() {
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
        <h3 className="text-3xl font-medium">프로필 수정</h3>
      </div>
      <Separator />
      <EditUserForm user={user} />
    </div>
  );
}
