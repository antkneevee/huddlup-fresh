import React, { useState, useEffect } from 'react';

import { ChevronUp, ChevronDown, PlusCircle, Trash2 } from 'lucide-react';
import PrintOptionsModal from './PrintOptionsModal';

const PlaybookLibrary = () => {
  const [playbooks, setPlaybooks] = useState([]);
  const [collapsed, setCollapsed] = useState({});
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printBookId, setPrintBookId] = useState(null);

  useEffect(() => {
    const books = [];
    for (let key in localStorage) {
      if (key.startsWith('Playbook-')) {
        try {
          const book = JSON.parse(localStorage.getItem(key));
          books.push(book);
        } catch {
          // ignore bad data
        }
      }
    }
    books.sort((a, b) => (a.order || 0) - (b.order || 0));
    setPlaybooks(books);
  }, []);

  const getPlay = (id) => {
    try {
      return JSON.parse(localStorage.getItem(id));
    } catch {
      return null;
    }
  };

  const movePlay = (bookId, index, direction) => {
    setPlaybooks((prev) =>
      prev.map((book) => {
        if (book.id !== bookId) return book;
        const ids = [...book.playIds];
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= ids.length) return book;
        [ids[index], ids[newIndex]] = [ids[newIndex], ids[index]];
        const updatedBook = { ...book, playIds: ids };
        localStorage.setItem(bookId, JSON.stringify(updatedBook));
        return updatedBook;
      })
    );
  };

  const addPlaybook = () => {
    const name = prompt('Playbook name');
    if (!name) return;
    const order = playbooks.length ? Math.max(...playbooks.map(b => b.order || 0)) + 1 : 0;
    const id = `Playbook-${Date.now()}`;
    const book = { id, name, playIds: [], order };
    localStorage.setItem(id, JSON.stringify(book));
    setPlaybooks(prev => [...prev, book]);
  };

  const deletePlaybook = (id) => {
    if (!window.confirm('Delete this playbook?')) return;
    localStorage.removeItem(id);
    setPlaybooks(prev => prev.filter(b => b.id !== id));
  };

  const movePlaybook = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= playbooks.length) return;
    const books = [...playbooks];
    [books[index], books[newIndex]] = [books[newIndex], books[index]];
    books.forEach((b, i) => {
      const updated = { ...b, order: i };
      localStorage.setItem(b.id, JSON.stringify(updated));
    });
    setPlaybooks(books);
  };

  const toggleCollapse = (id) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = (bookId) => {
    setPrintBookId(bookId);
    setShowPrintModal(true);
  };

  const handlePrintConfirm = (opts) => {
    const options = opts || {};

    const book = playbooks.find(b => b.id === printBookId);
    setShowPrintModal(false);

    if (!book) {
      setPrintBookId(null);
      return;
    }

    const plays = book.playIds
      .map(pid => getPlay(pid))
      .filter(Boolean);

    const w = window.open('', '_blank');
    if (!w) return;

    const includeTitle = options.includeTitle !== false;
    const includeNumber = options.includeNumber !== false;
    const perPage = options.playsPerPage || plays.length;
    const isWrist = options.type === 'wristband';
    const layout = options.layout || 4;


    // wristband layouts are always two rows. Map the number of plays
    // (4/6/8) to the correct column count (2/3/4).
    const columns = isWrist ? Math.ceil(layout / 2) : 4;

    // Treat width/height as the final wristband dimensions. Each cell is
    // sized by dividing the overall width/height by the layout.
    let scale = 1;
    let cellWidth = options.width / columns;
    let cellHeight = isWrist ? options.height / 2 : options.height;
    let gridWidth = options.width;
    let gridHeight = isWrist ? options.height : null;

    if (isWrist) {
      const maxPageWidth = 8; // leave room for printer margins
      if (options.width > maxPageWidth) {
        scale = maxPageWidth / options.width;
        gridWidth *= scale;
        gridHeight *= scale;
        cellWidth *= scale;
        cellHeight *= scale;
      }
    }



    const style = `
      <style>
        body{margin:0;padding:10px;font-family:sans-serif;}
        .page{page-break-after:always;margin-bottom:20px;}

                .grid{display:grid;${isWrist ? `grid-template-columns:repeat(${columns}, ${cellWidth}in);grid-template-rows:repeat(2, ${cellHeight}in);width:${gridWidth}in;height:${gridHeight}in;margin:auto;gap:0;` : 'grid-template-columns:repeat(4,1fr);gap:4px;'}}
        .play{position:relative;border:1px solid #000;${isWrist ? `width:${cellWidth}in;height:${cellHeight}in;` : 'padding:2px;'}text-align:center;}
        .label{position:absolute;top:0;left:0;display:flex;width:100%;z-index:1;}
                .num{background:#fff;color:#000;padding:2px 4px;font-size:10px;display:flex;justify-content:center;align-items:center;}
        .title{background:#000;color:#fff;padding:2px 4px;font-size:10px;flex:1;display:flex;align-items:center;}
        img{width:100%;height:100%;object-fit:contain;display:block;image-rendering:pixelated;}
      </style>
    `;

    w.document.write(`<html><head><title>${book.name}</title>${style}</head><body>`);

    if (isWrist) {
      w.document.write('<div class="grid page">');
      plays.forEach((play, idx) => {
        w.document.write('<div class="play">');
        if (includeNumber || includeTitle) {
          w.document.write('<div class="label">');
          if (includeNumber) w.document.write(`<div class="num">${idx + 1}</div>`);
          if (includeTitle) w.document.write(`<div class="title">${play.name}</div>`);
          w.document.write('</div>');
        }
        if (play.image) w.document.write(`<img src="${play.image}" />`);
        w.document.write('</div>');
      });
      w.document.write('</div>');
    } else {
      for (let i = 0; i < plays.length; i += perPage) {
        w.document.write('<div class="grid page">');
        const pagePlays = plays.slice(i, i + perPage);
        pagePlays.forEach((play, idx) => {
          const num = i + idx + 1;
          w.document.write('<div class="play">');
          if (includeNumber || includeTitle) {
            w.document.write('<div class="label">');
            if (includeNumber) w.document.write(`<div class="num">${num}</div>`);
            if (includeTitle) w.document.write(`<div class="title">${play.name}</div>`);
            w.document.write('</div>');
          }
          if (play.image) w.document.write(`<img src="${play.image}" />`);
          w.document.write('</div>');
        });
        w.document.write('</div>');
      }
    }

      w.document.write('</body></html>');
      w.document.close();
      setTimeout(() => { w.focus(); w.print(); w.close(); }, 300);

    setPrintBookId(null);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Playbooks</h1>
        <button
          onClick={addPlaybook}
          className="flex items-center bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
        >
          <PlusCircle className="w-4 h-4 mr-1" /> Add
        </button>
      </div>
      {playbooks.map((book, bIndex) => (
        <div key={book.id} className="mb-8 bg-gray-800 p-4 rounded">
          <div className="flex justify-between items-center mb-2">

            <div className="flex items-center gap-2">
              <button
                className="bg-gray-700 p-1 rounded"
                onClick={() => movePlaybook(bIndex, -1)}
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                className="bg-gray-700 p-1 rounded"
                onClick={() => movePlaybook(bIndex, 1)}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <h2
                className="text-lg font-bold cursor-pointer"
                onClick={() => toggleCollapse(book.id)}
              >
                {book.name}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePrint(book.id)}
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm"
              >
                Print
              </button>
              <button
                onClick={() => deletePlaybook(book.id)}
                className="bg-red-600 hover:bg-red-500 px-2 py-1 rounded text-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!collapsed[book.id] && (
            <div className="grid grid-cols-4 gap-4">
              {book.playIds.map((pid, idx) => {
                const play = getPlay(pid);
                if (!play) return null;
                return (
                  <div key={pid} className="bg-gray-700 p-2 rounded relative">
                    <div className="absolute top-1 right-1 flex flex-col gap-1">
                      <button
                        className="bg-gray-600 text-white rounded p-1"
                        onClick={() => movePlay(book.id, idx, -1)}
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        className="bg-gray-600 text-white rounded p-1"
                        onClick={() => movePlay(book.id, idx, 1)}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>

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
          )}
        </div>
      ))}
      {showPrintModal && (
        <PrintOptionsModal onClose={() => setShowPrintModal(false)} onPrint={handlePrintConfirm} />
      )}
    </div>
  );
};

export default PlaybookLibrary;
