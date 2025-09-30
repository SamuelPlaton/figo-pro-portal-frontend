'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/types';
import { useAuth, useToast } from '@/context';
import { PageLoader } from '@/components/page-loader';

export function withValidatedAccountGuard<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  const ValidatedAccountGuardHOC: React.FC<P> = props => {
    const { addToast } = useToast();
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user !== undefined && (!user || !user.validated_at)) {
        console.log({ isAuthenticated, user });
        addToast(
          'Notre modération est en train de vérifier votre compte, veuillez patienter...',
          'error',
          'Accès restreint',
        );
        router.replace(ROUTES.HOME);
      }
    }, [isAuthenticated, user, addToast, router]);

    if (!user || !user.validated_at) {
      return <PageLoader />;
    }

    return <WrappedComponent {...props} />;
  };

  return ValidatedAccountGuardHOC;
}
