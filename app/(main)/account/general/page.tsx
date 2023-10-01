import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './ProfileForm';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/modules/user/application/getSessionUser';

export default async function AccountGeneralPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect('/signin');
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-3xl font-medium">프로필 수정</h3>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
}
