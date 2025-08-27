'use client';
import { useEffect, useState } from 'react';
import { Checkout, Product, ROUTES } from '@/types';
import { api } from '@/lib/api';
import { Button, Drawer, ProductItem, ProductItemSkeleton } from '@/components';
import { useRouter } from 'next/navigation';

export default function OrderPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>();
  const [checkout, setCheckout] = useState<Checkout>({ items: [] });

  useEffect(() => {
    const getProducts = async () => {
      return api.products.getProducts().then(products => setProducts(products.data));
    };
    getProducts();

    const checkoutStorage = localStorage.getItem('checkout');
    setCheckout(checkoutStorage ? JSON.parse(checkoutStorage) : { items: [] });
  }, []);

  useEffect(() => {
    console.log('CHECKOUT', checkout);
    localStorage.setItem('checkout', JSON.stringify(checkout));
  }, [checkout]);

  const addItem = (product: Product) => {
    setCheckout({
      items: [
        ...checkout.items,
        {
          id: product.id,
          quantity: 1,
        },
      ],
    });
  };

  // todo: have products, price and access condition in database
  // todo: send in body of /orders address instead of user_address
  // todo: set not-found page

  return (
    <>
      <div className="root-spacing">
        {/* HEADER */}
        <p className="font-bold text-2xl text-primary mb-1">
          Sélectionnez les supports que vous souhaitez commander :
        </p>
        <p>
          Passez commande pour tous les flyers, affiches et PLV disponibles pour votre
          établissement.
        </p>
        {/* PRODUCT LIST */}
        <div className="mt-8 flex flex-row gap-8">
          {products ? (
            products?.map((product, key) => (
              <ProductItem
                key={key}
                onClick={() => addItem(product)}
                product={product}
                isAlreadyAdded={checkout.items.some(item => item.id === product.id)}
              />
            ))
          ) : (
            <ProductItemSkeleton />
          )}
        </div>
      </div>
      {/* CHECKOUT FORM */}
      <Drawer>
        <span>Test</span>
      </Drawer>
      {/* NAVIGATION */}
      <div
        className="fixed bottom-0 left-0 right-0 flex flex-row justify-between items-center py-4 root-spacing"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
      >
        <Button
          label="Retour"
          prependIcon="arrowLeft"
          variant="outline"
          onClick={() => router.back()}
          size="lg"
        />
        <Button
          label={`Voir mon panier${checkout.items.length > 0 ? ` (${checkout.items.length})` : ''}`}
          onClick={() => router.push(ROUTES.CHECKOUT)}
          appendIcon="shoppingCart"
          disabled={checkout.items.length === 0}
          size="lg"
        />
      </div>
    </>
  );
}
