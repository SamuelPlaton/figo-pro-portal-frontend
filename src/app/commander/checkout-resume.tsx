import { Checkout, CheckoutItem, Product } from '@/types';
import { CheckoutResumeItem, CheckoutTotalPrice } from '@/app/commander';
import { Button } from '@/components';

interface CheckoutResumeProps {
  checkout: Checkout;
  products: Product[];
  onRemoveItem: (item: CheckoutItem) => void;
  onSubmit: () => void;
  onClose: () => void;
}
export default function CheckoutResume({
  checkout,
  products,
  onRemoveItem,
  onSubmit,
  onClose,
}: CheckoutResumeProps) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-lg">Votre panier</span>
      <div className="flex-grow">
        {checkout.items.map(item => (
          <CheckoutResumeItem
            key={item.id}
            product={products.find(p => p.id === item.id)}
            onRemove={() => onRemoveItem(item)}
            className="py-4 border-b border-neutral-lower"
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 m-6 pt-6 border-t border-neutral-lower flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-2 font-bold">
          <span>Sous total</span>
          <CheckoutTotalPrice checkout={checkout} products={products} />
        </div>
        <Button
          label="Continuer"
          appendIcon="arrowRight"
          size="lg"
          onClick={onSubmit}
          disabled={checkout.items.length === 0}
        />
        <span className="underline text-primary cursor-pointer text-center" onClick={onClose}>
          ou continuer mes commandes
        </span>
      </div>
    </div>
  );
}
