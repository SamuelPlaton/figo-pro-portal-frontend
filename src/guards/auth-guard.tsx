'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/types';
import { useAuth, useToast } from '@/context';

export function withAuthGuard<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const AuthGuardHOC: React.FC<P> = props => {
    const { addToast } = useToast();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    if (!isAuthenticated) {
      addToast('Veuillez vous connecter', 'error');
      router.replace(ROUTES.SIGNIN);
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthGuardHOC;
}
