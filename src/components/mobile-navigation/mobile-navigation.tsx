'use client';
import { Drawer, Icon } from '@/components';
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
      <Drawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} className="p-4">
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
      </Drawer>
    </>
  );
}
