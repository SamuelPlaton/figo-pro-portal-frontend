'use client';
import { useState } from 'react';
import { Drawer } from '@/components';
import { Checkout, CheckoutItem, CloudPrinterOrder, Product } from '@/types';
import { CheckoutForm, CheckoutResume } from '@/app/commander';
import CheckoutSuccess from '@/app/commander/checkout-success';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onRemoveCheckoutItem: (item: CheckoutItem) => void;
  onOrderCreated: () => void;
  checkout: Checkout;
  products: Product[];
}
export default function CheckoutDrawer({
  isOpen,
  onClose,
  onRemoveCheckoutItem,
  onOrderCreated,
  checkout,
  products,
}: CheckoutDrawerProps) {
  const [isCheckoutFormOpened, setIsCheckoutFormOpened] = useState(false);
  const [order, setOrder] = useState<CloudPrinterOrder>();

  const handleCheckoutFormClose = () => {
    setIsCheckoutFormOpened(false);
    onClose();
  };

  const handleOrderCreated = (order: CloudPrinterOrder) => {
    setOrder(order);
    onOrderCreated();
  };

  const getChildren = () => {
    if (order) return <CheckoutSuccess products={products} order={order} />;
    if (isCheckoutFormOpened)
      return <CheckoutForm checkout={checkout} onSuccess={handleOrderCreated} />;
    return (
      <CheckoutResume
        checkout={checkout}
        products={products}
        onRemoveItem={onRemoveCheckoutItem}
        onSubmit={() => setIsCheckoutFormOpened(true)}
        onClose={handleCheckoutFormClose}
      />
    );
  };

  return (
    <Drawer isOpen={isOpen} onClose={handleCheckoutFormClose}>
      {getChildren()}
    </Drawer>
  );
}
