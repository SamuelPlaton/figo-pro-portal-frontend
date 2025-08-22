'use client';
import { Icon } from '@/components';
import { useState } from 'react';

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <Icon
        name="burgerMenu"
        size={32}
        className="cursor-pointer md:hidden"
        onClick={() => setIsMenuOpen(true)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-screen bg-white shadow-lg transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button onClick={() => setIsMenuOpen(false)} className="p-2">
          ✕
        </button>
        <nav className="p-4">
          <ul>
            <li>
              <a href="#home">Accueil</a>
            </li>
            <li>
              <a href="#about">À propos</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
