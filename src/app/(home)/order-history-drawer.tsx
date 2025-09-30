'use client';
import { useEffect, useState } from 'react';
import { Order } from '@/types';
import { api } from '@/lib/api';
import { Drawer } from '@/components';
import { OrderCard } from '@/app/(home)/index';
import { useToast } from '@/context/toast-context';

interface OrderHistoryDrawerProps {
  onClose: () => void;
  isOpen: boolean;
}
export default function OrderHistoryDrawer({ isOpen, onClose }: OrderHistoryDrawerProps) {
  const { addToast } = useToast();
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    const getData = () => {
      return api.orders
        .getOrders()
        .then(orders => setOrders(orders.data.data))
        .catch(() => {
          addToast('Une erreur est survenue', 'error');
        });
    };
    getData();
  }, []);

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-1 mb-6">
        <span className="text-2xl text-primary font-bold pr-6">Historique de commandes</span>
        <span className="text-neutral-low">Consultez le statut de vos commandes</span>
      </div>
      <div className="flex flex-col gap-8">
        {orders?.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </Drawer>
  );
}
