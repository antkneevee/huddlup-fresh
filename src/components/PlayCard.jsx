import React from 'react';

const PlayCard = ({ play }) => {
  return (
    <div className="bg-gray-800 rounded p-2 relative overflow-hidden">
      {/* Placeholder for play image */}
      <div className="bg-gray-600 w-full h-40 mb-2 rounded"></div>

      {/* Top-left: Play Name */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
        {play.name}
      </div>

      {/* Bottom: Tags */}
      <div className="flex flex-wrap gap-1 mt-2">
        {play.tags.map((tag, idx) => (
          <span key={idx} className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PlayCard;
