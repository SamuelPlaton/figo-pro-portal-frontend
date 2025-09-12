import { Metadata } from 'next';
import AdminPageCore from '@/app/admin/_client';

export const metadata: Metadata = {
  title: "Figo - Panneau d'administration",
  description: 'Administrez les utilisateurs Figo',
};

export default function OrderPage() {
  return <AdminPageCore />;
}
