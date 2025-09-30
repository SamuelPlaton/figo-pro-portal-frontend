import { Metadata } from 'next';
import ProfilCore from './_client';

// todo: store user on signup on SKYLARK TOOL (see w/ Clemence)

export const metadata: Metadata = {
  title: 'Figo - Mon Profil',
  description: 'Consultez votre profil professionnel',
};

export default function Login() {
  return <ProfilCore />;
}
