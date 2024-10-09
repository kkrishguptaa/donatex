"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          CharityShare
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/items" className="text-gray-600 hover:text-gray-800">
                Browse Items
              </Link>
            </li>
            {session ? (
              <>
                <li>
                  <Link href="/profile" className="text-gray-600 hover:text-gray-800">
                    Profile
                  </Link>
                </li>
                <li>
                  <Button onClick={() => signOut()}>Sign out</Button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/auth/signin">
                  <Button>Sign in</Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}