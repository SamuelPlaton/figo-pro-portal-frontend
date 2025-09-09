import { HeroAuth } from '@/components';
import { SignUpForm } from '@/app/sign-up/local-components';
import { withGuestGuard } from '@/guards';

const SignUpCore = () => {
  return (
    <div className="root-spacing flex flex-row justify-center gap-8 my-10">
      <HeroAuth />
      <SignUpForm />
    </div>
  );
};

export default withGuestGuard(SignUpCore);
