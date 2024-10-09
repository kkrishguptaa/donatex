import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div>
        <p><strong>Email:</strong> {session.user?.email}</p>
        {/* Add more profile information here */}
      </div>
    </div>
  );
}