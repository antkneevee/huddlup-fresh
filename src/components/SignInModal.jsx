import React from 'react';
import { X } from 'lucide-react';
import logo from '../assets/huddlup_logo_2.svg';

const SignInModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-gray-800 text-white rounded p-6 w-80">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center mb-4">
          <img src={logo} alt="HuddlUp Logo" className="h-10 mx-auto" />
        </div>
        <form className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="mt-2 px-3 py-1 rounded bg-blue-600 hover:bg-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
