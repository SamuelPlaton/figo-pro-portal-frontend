'use client';
import { useEffect, useState } from 'react';
import { Checkout, CheckoutItem, Product } from '@/types';
import { api } from '@/lib/api';
import {
  CheckoutDrawer,
  CheckoutNavigation,
  ProductCatalogue,
} from '@/app/commander/local-components';
import { Metadata } from 'next';
import { useToast } from '@/context/toast-context';
import { withAuthGuard } from '@/guards';

export const metadata: Metadata = {
  title: 'Figo - Commander',
  description: 'Commandez des goodies et flyers avec vos crédits Figo',
};

const OrderPageCore = () => {
  const { addToast } = useToast();
  const [products, setProducts] = useState<Product[]>();
  const [checkout, setCheckout] = useState<Checkout>({ items: [] });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Load Checkout from Local Storage, Products from API
  useEffect(() => {
    const loadProducts = async () => {
      return api.products
        .getProducts()
        .then(products => setProducts(products.data))
        .catch(() => {
          addToast('Une erreur est survenue', 'error');
        });
    };
    loadProducts();

    const checkoutStorage = localStorage.getItem('checkout');
    setCheckout(checkoutStorage ? JSON.parse(checkoutStorage) : { items: [] });
  }, []);

  // save checkout every updates
  useEffect(() => {
    localStorage.setItem('checkout', JSON.stringify(checkout));
  }, [checkout]);

  const addItem = (product: Product) => {
    setCheckout(prevCheckout => ({
      ...prevCheckout,
      items: [...prevCheckout.items, { id: product.id, quantity: 1 }],
    }));
  };

  const removeItem = (item: CheckoutItem) => {
    setCheckout(prevCheckout => ({
      ...prevCheckout,
      items: prevCheckout.items.filter(i => i.id !== item.id),
    }));
  };

  const emptyCheckout = () => {
    setCheckout({ items: [] });
  };

  // todo: rework header (!!!)

  return (
    <>
      <ProductCatalogue products={products} checkout={checkout} onAddProduct={addItem} />
      {/* CHECKOUT FORM */}
      {products && (
        <CheckoutDrawer
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onRemoveCheckoutItem={removeItem}
          checkout={checkout}
          products={products}
          onOrderCreated={emptyCheckout}
        />
      )}
      {/* NAVIGATION */}
      <CheckoutNavigation
        checkout={checkout}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        isLoading={!products}
      />
    </>
  );
};

export default withAuthGuard(OrderPageCore);
