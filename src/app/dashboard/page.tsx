"use client";

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface Item {
  id: string;
  name: string;
  description: string;
  donorName: string;
  imageUrl: string;
}

const sampleItems: Item[] = [
  {
    id: '1',
    name: 'Warm Winter Coat',
    description: 'Gently used winter coat, perfect for cold weather.',
    donorName: 'John Doe',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29hdHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '2',
    name: 'Children\'s Books Set',
    description: 'A collection of 10 children\'s books in excellent condition.',
    donorName: 'Jane Smith',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4ncyUyMGJvb2tzfGVufDB8fDB8fHww',
  },
];

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>(sampleItems);
  const [newItem, setNewItem] = useState<Item>({ id: '', name: '', description: '', donorName: '', imageUrl: '' });
  const { data: session } = useSession();

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    setItems([...items, { ...newItem, id: Date.now().toString() }]);
    setNewItem({ id: '', name: '', description: '', donorName: '', imageUrl: '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!session) {
    return <div className="text-center mt-10">Please sign in to access the dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Charity Item Sharing</h1>
          <div className="flex items-center">
            <Search className="mr-2" />
            <Input
              type="text"
              placeholder="Search items..."
              className="px-2 py-1 rounded text-foreground bg-background"
            />
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-grow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Available Items</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Item</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
              </DialogHeader>
              <form onSubmit={addItem} className="space-y-4">
                <div>
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="donorName">Your Name</Label>
                  <Input
                    id="donorName"
                    value={newItem.donorName}
                    onChange={(e) => setNewItem({ ...newItem, donorName: e.target.value })}
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
                <Button type="submit">Add Item</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-card text-card-foreground p-4 rounded shadow">
              <Image src={item.imageUrl} alt={item.name} width={300} height={200} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-muted-foreground">{item.description}</p>
              <p className="text-sm text-muted-foreground mt-2">Donated by: {item.donorName}</p>
            </div>
          ))}
        </div>
        {items.length === 0 && (
          <p className="text-center text-muted-foreground">No items available. Be the first to donate!</p>
        )}
      </main>
      <footer className="bg-muted text-muted-foreground text-center p-4">
        <p>&copy; 2024 Charity Item Sharing. All rights reserved.</p>
      </footer>
    </div>
  );
}