import React from 'react';

const Toolbar = ({ onStartRoute, onFinishRoute, onToggleSmooth, smooth }) => {
  return (
    <div>
      <button onClick={onStartRoute}>Start Route</button>
      <button onClick={onFinishRoute}>Finish Route</button>
      <label>
        <input
          type="checkbox"
          checked={smooth}
          onChange={onToggleSmooth}
        />
        Smooth Lines
      </label>
    </div>
  );
};

export default Toolbar;
