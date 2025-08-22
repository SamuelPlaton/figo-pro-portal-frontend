'use client';

import React, { useState } from 'react';

interface CollapsibleProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}
export default function Collapsible({ label, children, className }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <div className="flex flex-row justify-between gap-4">
        <span className="text-lg">{label}</span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-10 h-10 text-2xl bg-primary text-white cursor-pointer"
        >
          {isOpen ? '-' : '+'}
        </button>
      </div>
      <div
        className={`${isOpen ? 'max-h-96 opacity-100 pt-8' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
}
