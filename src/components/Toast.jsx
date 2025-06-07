import React from 'react';

const Toast = ({ message }) => (
  <div
    className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md"
    style={{ zIndex: 9999 }}
  >
    {message}
  </div>
);

export default Toast;
