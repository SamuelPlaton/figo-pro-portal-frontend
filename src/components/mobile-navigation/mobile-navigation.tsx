'use client';
import { Button, Drawer, Icon } from '@/components';
import { useState } from 'react';
import Image from 'next/image';
import { ROUTES } from '@/types';
import { api } from '@/lib/api';
import { useAuth, useDrawer } from '@/context';
import { useRouter } from 'next/navigation';

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openDrawer } = useDrawer();
  const { isAuthenticated, refreshAuth } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await api.auth.logout();
    await refreshAuth();
    router.replace(ROUTES.SIGNIN);
    setIsMenuOpen(false);
  };

  const redirectTo = (path: string) => {
    console.log('path', path);
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Icon
        name="burgerMenu"
        size={32}
        className="cursor-pointer md:hidden"
        onClick={() => setIsMenuOpen(true)}
      />
      <Drawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <Image
          src="/assets/figo-short-logo.svg"
          alt="figo-logo"
          width={34}
          height={40}
          className="mb-8"
        />
        <div className="flex flex-col items-start gap-6 text-primary">
          {!isAuthenticated && (
            <button onClick={() => redirectTo(ROUTES.SIGNIN)}>Se connecter</button>
          )}
          {isAuthenticated && (
            <button onClick={() => redirectTo(ROUTES.PROFILE)} type="button">
              Mon profil
            </button>
          )}
          <a>Nous contacter</a>
          {isAuthenticated && <button onClick={handleLogout}>Se déconnecter</button>}
          <Button
            label="Partager mon lien"
            onClick={() => openDrawer('link-sharing')}
            className="w-full"
          />
        </div>
      </Drawer>
    </>
  );
}
