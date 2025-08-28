import { HeroAuth } from '@/components';
import { SignInForm } from '@/app/sign-in';

export default function Login() {
  return (
    <div className="root-spacing flex flex-row justify-center gap-8 my-10">
      <HeroAuth />
      <SignInForm />
    </div>
  );
}
