'use client';
import { HeroAuth } from '@/components';
import { SignInForm } from '@/app/sign-in/local-components';
import { withGuestGuard } from '@/guards';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from '@/context';

const LoginCore = () => {
  const searchParams = useSearchParams();
  const { addToast } = useToast();

  useEffect(() => {
    const errorCode = searchParams.get('error');
    if (errorCode) {
      addToast(
        errorCode === 'NOT_PRIMARY_ACCOUNT'
          ? 'Un autre compte existe déjà avec cet email'
          : 'Veuillez contacter le support',
        'error',
        'Une erreur est survenue',
      );
    }
  }, [searchParams]);
  return (
    <div className="root-spacing flex flex-row justify-center gap-8 my-10">
      <HeroAuth />
      <SignInForm />
    </div>
  );
};

export default withGuestGuard(LoginCore);
