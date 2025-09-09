import { Metadata } from 'next';
import HomeCore from '@/app/_client';

export const metadata: Metadata = {
  title: 'Figo - Portail vétérinaire',
  description: 'Accédez à votre portail professionnel',
};

export default function Home() {
  return <HomeCore />;
}
