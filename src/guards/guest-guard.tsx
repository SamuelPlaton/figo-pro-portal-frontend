'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/types';
import { PageLoader } from '@/components/page-loader';
import { useAuth } from '@/context';

export function withGuestGuard<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const GuestGuardHOC: React.FC<P> = props => {
    const [loading, setLoading] = useState(true);
    const [isGuest, setIsGuest] = useState(false);
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      async function checkGuest() {
        try {
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
    }, [router, isAuthenticated]);

    if (loading) return <PageLoader />;

    if (!isGuest) return null;

    return <WrappedComponent {...props} />;
  };

  return GuestGuardHOC;
}
