'use client';
import { Icon } from '@/components';
import { useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export default function Drawer({ children, isOpen, onClose, className }: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Dark Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50 cursor-pointer' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50
        w-full sm:w-1/3 max-w-[700px] p-6 flex flex-col overflow-y-scroll
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close Button */}
        <div className="flex">
          <div
            className="bg-neutral-lowest rounded-full p-2 ml-auto cursor-pointer"
            onClick={onClose}
          >
            <Icon name="x" size={12} />
          </div>
        </div>

        {/* Contenu */}
        <div className={`flex flex-col flex-grow ${className}`}>{children}</div>
      </div>
    </>
  );
}
