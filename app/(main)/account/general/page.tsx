import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './ProfileForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function AccountGeneralPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-3xl font-medium">프로필 수정</h3>
      </div>
      <Separator />
      <ProfileForm user={session.user} />
    </div>
  );
}
