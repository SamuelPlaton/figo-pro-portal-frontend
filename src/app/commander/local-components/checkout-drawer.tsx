'use client';
import { useState } from 'react';
import { Drawer } from '@/components';
import { Checkout, CheckoutItem, Order, Product, ROUTES } from '@/types';
import {
  CheckoutForm,
  CheckoutResume,
  CheckoutSuccess,
} from '@/app/commander/local-components/index';
import { useRouter } from 'next/navigation';
import { useDrawer } from '@/context';

interface CheckoutDrawerProps {
  onRemoveCheckoutItem: (item: CheckoutItem) => void;
  onOrderCreated: () => void;
  checkout: Checkout;
  products: Product[];
}

export default function CheckoutDrawer({
  onRemoveCheckoutItem,
  onOrderCreated,
  checkout,
  products,
}: CheckoutDrawerProps) {
  const router = useRouter();
  const [isCheckoutFormOpened, setIsCheckoutFormOpened] = useState(false);
  const { closeDrawer, isDrawerOpen } = useDrawer();
  const [order, setOrder] = useState<Order>();

  const handleCheckoutClose = () => {
    closeDrawer('checkout');
    setOrder(undefined);
    setIsCheckoutFormOpened(false);
    if (order) {
      router.push(ROUTES.HOME);
    }
  };

  const handleOrderCreated = (order: Order) => {
    setOrder(order);
    onOrderCreated();
  };

  const getChildren = () => {
    if (order) return <CheckoutSuccess order={order} />;
    if (isCheckoutFormOpened)
      return <CheckoutForm checkout={checkout} onSuccess={handleOrderCreated} />;
    return (
      <CheckoutResume
        checkout={checkout}
        products={products}
        onRemoveItem={onRemoveCheckoutItem}
        onSubmit={() => setIsCheckoutFormOpened(true)}
        onClose={handleCheckoutClose}
      />
    );
  };

  return (
    <Drawer isOpen={isDrawerOpen('checkout')} onClose={handleCheckoutClose}>
      {getChildren()}
    </Drawer>
  );
}
