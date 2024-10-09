import ItemList from '@/components/ItemList';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ItemsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Items</h1>
      <ItemList />
      {session ? (
        <div className="mt-6">
          <Link href="/items/donate">
            <Button>Donate an Item</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <p className="mb-2">Sign in to donate or request items.</p>
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      )}
    </div>
  );
}