import React, { useState } from 'react'
import { Item } from '../types'

interface AddItemFormProps {
  onAddItem: (item: Item) => void
  onCancel: () => void
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem, onCancel }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [donorName, setDonorName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem: Item = {
      id: Date.now().toString(),
      name,
      description,
      donorName,
    }
    onAddItem(newItem)
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Item Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="donorName" className="block text-gray-700 font-bold mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="donorName"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddItemForm