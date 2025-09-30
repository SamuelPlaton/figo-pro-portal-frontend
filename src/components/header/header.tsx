'use client';

import Image from 'next/image';
import { Button, Dropdown, MobileNavigation } from '@/components';
import { useRouter, usePathname } from 'next/navigation';
import { Checkout, ROUTES } from '@/types';
import { api } from '@/lib/api';
import { useAuth, useDrawer } from '@/context';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const { openDrawer } = useDrawer();
  const pathname = usePathname();
  const { isAuthenticated, refreshAuth, user } = useAuth();

  const [checkout, setCheckout] = useState<Checkout>({ items: [] });
  const [isDropdownProfileOpen, setIsDropdownProfileOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem('checkout');
      setCheckout(stored ? JSON.parse(stored) : { items: [] });
    };
    sync();
    window.addEventListener('checkout-update', sync);
    return () => window.removeEventListener('checkout-update', sync);
  }, []);

  const handleLogout = async () => {
    await api.auth.logout();
    await refreshAuth();
    router.replace(ROUTES.SIGNIN);
    setIsDropdownProfileOpen(false);
  };

  return (
    <div className="flex flex-row justify-between m-4 md:mx-20 md:my-6">
      <div
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => router.push(ROUTES.HOME)}
      >
        <Image
          src="/assets/figo-short-logo.svg"
          alt="figo-logo"
          width={34}
          height={40}
          className="md:hidden"
        />
        <Image
          src="/assets/figo-logo.svg"
          alt="figo-logo"
          width={77}
          height={31}
          className="hidden md:block"
        />
      </div>
      {/* Desktop/Tablet navigation */}
      <div className="flex-row gap-6 hidden md:flex items-center">
        {pathname === ROUTES.HOME && isAuthenticated && (
          <Button
            size="md"
            variant="outline"
            onClick={() => console.log('contact')}
            label="Nous contacter"
          />
        )}
        {isAuthenticated && user?.promo_code && (
          <Button
            size="md"
            variant={pathname === ROUTES.HOME ? 'primary' : 'outline'}
            onClick={() => openDrawer('link-sharing')}
            appendIcon="upload"
            label="Partager mon lien"
          />
        )}
        {pathname === ROUTES.ORDER && (
          <Button
            size="md"
            variant="primary"
            onClick={() => openDrawer('checkout')}
            appendIcon="shoppingCart"
            disabled={checkout.items.length === 0}
            label={`Voir mon panier${checkout.items.length > 0 ? ` (${checkout.items.length})` : ''}`}
          />
        )}
        {isAuthenticated && (
          <div className="relative inline-block">
            <Button
              appendIcon="userCircle"
              variant="ghost"
              onClick={() => setIsDropdownProfileOpen(true)}
              size="xl"
            />
            <Dropdown
              onClose={() => setIsDropdownProfileOpen(false)}
              isOpen={isDropdownProfileOpen}
            >
              <div className="flex flex-col items-start gap-2 p-4">
                <div className="border-b-2 border-b-gray w-full">
                  <Button
                    size="sm"
                    variant="ghost"
                    label="Mon profil"
                    onClick={() => {
                      setIsDropdownProfileOpen(false);
                      router.push(ROUTES.PROFILE);
                    }}
                    className="w-fit"
                  />
                </div>
                <Button size="sm" variant="ghost" onClick={handleLogout} label="Se déconnecter" />
              </div>
            </Dropdown>
          </div>
        )}
        {!isAuthenticated && (
          <Button size="md" variant="primary" label="Se connecter" href={ROUTES.SIGNIN} />
        )}
      </div>
      {/* Mobile navigation */}
      <MobileNavigation />
    </div>
  );
}
