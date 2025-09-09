import React from 'react';

export default function PageLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
    </div>
  );
}
