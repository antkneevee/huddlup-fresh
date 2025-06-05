import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import PlayEditor from './PlayEditor';
import PlayLibrary from './components/PlayLibrary';
import PlaybookLibrary from './components/PlaybookLibrary';
import logo from './assets/huddlup_logo_1.png';
import { Home, Book, BookOpen } from 'lucide-react';

const AppContent = () => {
  const [selectedPlay, setSelectedPlay] = useState(null);
  const navigate = useNavigate();

  const handleLoadPlay = (play) => {
    setSelectedPlay(play);
    navigate('/');  // Use navigate to stay within SPA and preserve state
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="w-full bg-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="HuddlUp Logo" className="h-8" />
            <h1 className="text-xl font-bold">huddlup</h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            <Link
              to="/"
              className="flex items-center bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
            >
              <Home className="w-4 h-4 mr-1" /> Editor
            </Link>
            <Link
              to="/library"
              className="flex items-center bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
            >
              <Book className="w-4 h-4 mr-1" /> Play Library
            </Link>
            <Link
              to="/playbooks"
              className="flex items-center bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
            >
              <BookOpen className="w-4 h-4 mr-1" /> Playbooks
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<PlayEditor loadedPlay={selectedPlay} />} />
          <Route path="/library" element={<PlayLibrary onSelectPlay={handleLoadPlay} />} />
          <Route path="/playbooks" element={<PlaybookLibrary />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;