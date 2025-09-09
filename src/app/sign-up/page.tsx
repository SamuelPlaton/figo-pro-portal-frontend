import { Metadata } from 'next';
import SignUpCore from '@/app/sign-up/_client';

export const metadata: Metadata = {
  title: "Figo - S'inscrire",
  description: 'Inscrivez-vous à votre portail professionnel',
};

export default function SignUp() {
  return <SignUpCore />;
}
