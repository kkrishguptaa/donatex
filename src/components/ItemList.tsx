"use client";

import { useState, useEffect } from 'react';
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

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // In a real application, you would fetch items from an API here
    setItems(sampleItems);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded shadow">
          <Image src={item.imageUrl} alt={item.name} width={300} height={200} className="w-full h-48 object-cover mb-4 rounded" />
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">{item.description}</p>
          <p className="text-sm text-gray-500 mt-2">Donated by: {item.donorName}</p>
        </div>
      ))}
    </div>
  );
}