import React from 'react';

const SaveAsModal = ({ value, onChange, onCancel, onSave }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white text-black rounded p-4 w-full max-w-sm">
      <h2 className="text-lg font-bold mb-2">Save Play As</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-1 rounded border mb-2"
      />
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-3 py-1 rounded bg-gray-300">
          Cancel
        </button>
        <button onClick={onSave} className="px-3 py-1 rounded bg-blue-600 text-white">
          Save
        </button>
      </div>
    </div>
  </div>
);

export default SaveAsModal;
