import React from 'react';

const SignInModal = ({ onClose, onSignIn }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white text-black rounded p-4 w-80">
      <h2 className="text-lg font-bold mb-2">Sign In</h2>
      <p className="mb-4">Sign in to continue.</p>
      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-3 py-1 rounded bg-gray-300">
          Cancel
        </button>
        <button onClick={onSignIn} className="px-3 py-1 rounded bg-blue-600 text-white">
          Sign In
        </button>
      </div>
    </div>
  </div>
);

export default SignInModal;
