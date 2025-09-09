'use client';

import Image from 'next/image';
import { Button, MobileNavigation } from '@/components';
import { useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/types';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  // todo: use AuthContext so pages call this context, and refreshAuth on login & logout actions
  useEffect(() => {
    const getIsAuthenticated = () => {
      return api.auth
        .isConnected()
        .then(response => setIsAuthenticated(response))
        .catch(() => setIsAuthenticated(false));
    };
    getIsAuthenticated();
  }, []);

  const handleLogout = async () => {
    await api.auth.logout();
    router.replace(ROUTES.SIGNIN);
  };

  // todo: header call outer refs (panier, partager)
  // todo: retrieve auth0 user metadata (is_validated_at, promo_code)
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
        <span className="text-sm md:text-md">en partenariat avec</span>
        <Image src="/assets/1health-logo.svg" alt="1health-logo" width={83} height={21} />
      </div>
      {/* Desktop/Tablet navigation */}
      <div className="flex-row gap-6 hidden md:flex">
        {pathname === ROUTES.HOME && isAuthenticated && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => console.log('contact')}
              label="Nous contacter"
            />
            <Button
              size="sm"
              variant="primary"
              onClick={() => console.log('share')}
              label="Partager"
            />
          </>
        )}
        {isAuthenticated === true && (
          <Button appendIcon="userCircle" variant="ghost" onClick={handleLogout} size="xl" />
        )}
        {isAuthenticated === false && (
          <Button size="sm" variant="primary" label="Se connecter" href={ROUTES.SIGNIN} />
        )}
      </div>
      {/* Mobile navigation */}
      <MobileNavigation />
    </div>
  );
}
