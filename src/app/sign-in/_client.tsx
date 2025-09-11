'use client';
import { HeroAuth } from '@/components';
import { SignInForm } from '@/app/sign-in/local-components';
import { withGuestGuard } from '@/guards';

const LoginCore = () => {
  return (
    <div className="root-spacing flex flex-row justify-center gap-8 my-10">
      <HeroAuth />
      <SignInForm />
    </div>
  );
};

export default withGuestGuard(LoginCore);
