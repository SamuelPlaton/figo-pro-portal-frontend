'use client';

import { useAuth, useToast } from '@/context';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/types';
import { PageLoader } from '@/components/page-loader';

type GuardProps = {
  children: React.ReactNode;
};

export function OnboardingGuard({ children }: GuardProps) {
  const { addToast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  // if user is authenticated and no user is found from BD, onboarding is required
  const mustBeOnboarded = user === null && isAuthenticated && pathname !== ROUTES.SIGNUP;

  useEffect(() => {
    if (mustBeOnboarded) {
      addToast('Veuillez finaliser votre inscription', 'error');
      router.push(ROUTES.SIGNUP);
    }
  }, [mustBeOnboarded, router, pathname, addToast]);

  if (mustBeOnboarded) return <PageLoader />;

  return <>{children}</>;
}
