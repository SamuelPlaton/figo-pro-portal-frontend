'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  align?: 'left' | 'right';
}

export default function Dropdown({ isOpen, onClose, children, align = 'right' }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={`absolute mt-2 min-w-[10rem] rounded-md bg-white shadow-lg ring-1 ring-black/5 ${
        align === 'right' ? 'right-0' : 'left-0'
      }`}
    >
      {children}
    </div>
  );
}
