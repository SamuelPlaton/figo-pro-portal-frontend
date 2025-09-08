import { HeroAuth } from '@/components';
import { SignUpForm } from '@/app/sign-up/local-components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Figo - Inscription',
  description: 'Inscrivez-vous',
};

export default function Login() {
  return (
    <div className="root-spacing flex flex-row justify-center gap-8 my-10">
      <HeroAuth />
      <SignUpForm />
    </div>
  );
}
