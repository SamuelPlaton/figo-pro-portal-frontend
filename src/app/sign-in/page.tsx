import { HeroAuth } from '@/components';
import { SignInForm } from '@/app/sign-in/local-components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Figo - S'inscrire",
  description: 'Inscrivez-vous à votre portail professionnel',
};

export default function Login() {
  return (
    <div className="root-spacing flex flex-row justify-center gap-8 my-10">
      <HeroAuth />
      <SignInForm />
    </div>
  );
}
