import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex flex-col">
      <header className="p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            CharityShare
          </Link>
          <div className="space-x-4">
            <Link href="/items" className="text-gray-800 hover:underline">
              Browse Items
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold text-gray-800 mb-6">
              Amplify human potential
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Connect with your community, share resources, and make a difference. 
              Donate or find items you need, all in one place.
            </p>
            <div className="space-x-4">
              <Link href="/items">
                <Button size="lg">Browse Items</Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="lg" variant="outline">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}