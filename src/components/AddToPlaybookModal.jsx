import React, { useState, useEffect } from 'react';

const AddToPlaybookModal = ({ playId, onClose }) => {
  const [playbooks, setPlaybooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [newBookName, setNewBookName] = useState('');

  useEffect(() => {
    const books = [];
    for (let key in localStorage) {
      if (key.startsWith('Playbook-')) {
        try {
          const book = JSON.parse(localStorage.getItem(key));
          books.push(book);
        } catch (e) {
          // ignore bad data
        }
      }
    }
    setPlaybooks(books);
    if (books.length > 0) setSelectedBookId(books[0].id);
  }, []);

  const handleAdd = () => {
    if (newBookName.trim()) {
      const id = `Playbook-${Date.now()}`;
      const book = { id, name: newBookName.trim(), playIds: [playId] };
      localStorage.setItem(id, JSON.stringify(book));
    } else if (selectedBookId) {
      const book = JSON.parse(localStorage.getItem(selectedBookId));
      if (!book.playIds.includes(playId)) {
        book.playIds.push(playId);
        localStorage.setItem(selectedBookId, JSON.stringify(book));
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded p-4 w-80">
        <h2 className="text-lg font-bold mb-2">Add to Playbook</h2>
        {playbooks.length > 0 && (
          <>
            <label className="block mb-1">Select Playbook</label>
            <select
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
              className="w-full p-1 rounded mb-2 border"
            >
              {playbooks.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.name}
                </option>
              ))}
            </select>
            <div className="text-center my-2 text-sm">or</div>
          </>
        )}
        <label className="block mb-1">New Playbook</label>
        <input
          type="text"
          value={newBookName}
          onChange={(e) => setNewBookName(e.target.value)}
          placeholder="Playbook Name"
          className="w-full p-1 rounded mb-2 border"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-3 py-1 rounded bg-blue-600 text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToPlaybookModal;