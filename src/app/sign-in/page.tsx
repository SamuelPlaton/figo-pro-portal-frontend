import { Metadata } from 'next';
import LoginCore from './_client';

export const metadata: Metadata = {
  title: 'Figo - Se connecter',
  description: 'Connectez-vous à votre portail professionnel',
};

export default function Login() {
  return <LoginCore />;
}
