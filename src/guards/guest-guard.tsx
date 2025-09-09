'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/types';
import { api } from '@/lib/api';
import { PageLoader } from '@/components/page-loader';

export function withGuestGuard<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const GuestGuardHOC: React.FC<P> = props => {
    const [loading, setLoading] = useState(true);
    const [isGuest, setIsGuest] = useState(false);
    const router = useRouter();

    useEffect(() => {
      async function checkGuest() {
        try {
          const isAuthenticated = await api.auth.isConnected();

          if (isAuthenticated) {
            router.replace(ROUTES.HOME);
          } else {
            setIsGuest(true);
          }
        } catch (err) {
          setIsGuest(true);
        } finally {
          setLoading(false);
        }
      }

      checkGuest();
    }, [router]);

    if (loading) return <PageLoader />;

    if (!isGuest) return null;

    return <WrappedComponent {...props} />;
  };

  return GuestGuardHOC;
}
