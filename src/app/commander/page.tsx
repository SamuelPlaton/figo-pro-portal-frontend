import { Metadata } from 'next';
import OrderPageCore from '@/app/commander/_client';

export const metadata: Metadata = {
  title: 'Figo - Commander',
  description: 'Commandez des goodies et flyers avec vos crédits Figo',
};

export default function OrderPage() {
  return <OrderPageCore />;
}
