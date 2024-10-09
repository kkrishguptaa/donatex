import React, { useState } from 'react'
import { Gift, Search } from 'lucide-react'
import ItemList from './components/ItemList'
import AddItemForm from './components/AddItemForm'
import { Item } from './types'

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [showAddForm, setShowAddForm] = useState(false)

  const addItem = (newItem: Item) => {
    setItems([...items, newItem])
    setShowAddForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Gift className="mr-2" /> Charity Item Sharing
          </h1>
          <div className="flex items-center">
            <Search className="mr-2" />
            <input
              type="text"
              placeholder="Search items..."
              className="px-2 py-1 rounded text-gray-800"
            />
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-grow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Available Items</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Item
          </button>
        </div>
        <ItemList items={items} />
        {showAddForm && (
          <AddItemForm onAddItem={addItem} onCancel={() => setShowAddForm(false)} />
        )}
      </main>
      <footer className="bg-gray-200 text-center p-4">
        <p>&copy; 2024 Charity Item Sharing. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App