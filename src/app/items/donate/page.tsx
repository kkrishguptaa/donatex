"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function DonatePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [item, setItem] = useState({ name: '', description: '', imageUrl: '' });

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the item data to your backend
    console.log('Donating item:', item);
    router.push('/items');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItem({ ...item, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Donate an Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="name">Item Name</Label>
          <Input
            id="name"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={item.description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="image">Item Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>
        <Button type="submit">Donate Item</Button>
      </form>
    </div>
  );
}