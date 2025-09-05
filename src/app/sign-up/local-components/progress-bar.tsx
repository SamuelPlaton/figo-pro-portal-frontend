import React from 'react';

type ProgressBarProps = {
  progress: number; // between 0 and 100
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-1.5 bg-neutral-lower border border-gray rounded">
      <div
        className="-mt-0.25 -ml-0.25 h-1.5 bg-cyan rounded transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
