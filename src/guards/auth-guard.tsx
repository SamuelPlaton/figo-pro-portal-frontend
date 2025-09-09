'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components';
import { ROUTES } from '@/types';
import { useToast } from '@/context';
import { api } from '@/lib/api';

export function withAuthGuard<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const AuthGuardHOC: React.FC<P> = props => {
    const { addToast } = useToast();
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
      async function checkAuth() {
        try {
          const isAuthenticated = await api.auth.isConnected();
          if (isAuthenticated) {
            setAuthenticated(true);
          } else {
            addToast('Veuillez vous connecter', 'error');
            router.replace(ROUTES.SIGNIN);
          }
        } catch (err) {
          console.error('Auth check failed:', err);
          addToast('Veuillez vous connecter', 'error');
          router.replace(ROUTES.SIGNIN);
        }
      }

      checkAuth();
    }, [addToast, router]);

    // Loader pendant la vérification
    if (authenticated === null) return <Loader />;

    // Ne rend le composant que si connecté
    if (!authenticated) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthGuardHOC;
}
