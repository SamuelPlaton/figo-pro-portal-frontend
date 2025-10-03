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
    const { user } = useAuth();

    useEffect(() => {
      async function checkGuest() {
        try {
          // guest guard requires user from database
          if (user) {
            router.replace(ROUTES.HOME);
          } else {
            setIsGuest(true);
          }
        } catch (err) {
          console.error(err);
          setIsGuest(true);
        } finally {
          setLoading(false);
        }
      }

      checkGuest();
    }, [router, user]);

    if (loading) return <PageLoader />;

    if (!isGuest) return null;

    return <WrappedComponent {...props} />;
  };

  return GuestGuardHOC;
}
