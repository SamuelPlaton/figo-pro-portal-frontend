'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, UserRoleEnum } from '@/types';
import { useAuth, useToast } from '@/context';
import { PageLoader } from '@/components/page-loader';

export function withAdminGuard<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const AdminGuardHOC: React.FC<P> = props => {
    const { addToast } = useToast();
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user !== undefined && (!user || user.role !== UserRoleEnum.ADMIN)) {
        addToast("Accès réservé à l'administration", 'error', 'Accès restreint');
        router.replace(ROUTES.HOME);
      }
    }, [user, addToast, router]);

    if (!user) {
      return <PageLoader />;
    }

    return <WrappedComponent {...props} />;
  };

  return AdminGuardHOC;
}
