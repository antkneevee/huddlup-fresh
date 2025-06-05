import React, { useState, useEffect } from 'react';

const PlaybookLibrary = () => {
  const [playbooks, setPlaybooks] = useState([]);

  useEffect(() => {
    const books = [];
    for (let key in localStorage) {
      if (key.startsWith('Playbook-')) {
        try {
          const book = JSON.parse(localStorage.getItem(key));
          books.push(book);
        } catch (e) {
          // ignore
        }
      }
    }
    setPlaybooks(books);
  }, []);

  const getPlay = (id) => {
    try {
      return JSON.parse(localStorage.getItem(id));
    } catch {
      return null;
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Playbooks</h1>
      {playbooks.map((book) => (
        <div key={book.id} className="mb-8 bg-gray-800 p-4 rounded">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">{book.name}</h2>
            <button
              onClick={() => window.print()}
              className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm"
            >
              Print
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {book.playIds.map((pid) => {
              const play = getPlay(pid);
              if (!play) return null;
              return (
                <div key={pid} className="bg-gray-700 p-2 rounded">
                  {play.image ? (
                    <img
                      src={play.image}
                      alt={play.name}
                      className="w-full h-40 object-contain rounded mb-2 bg-white"
                    />
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center bg-gray-600 text-gray-400 rounded mb-2">
                      No Image
                    </div>
                  )}
                  <h3 className="text-sm font-bold">{play.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaybookLibrary;