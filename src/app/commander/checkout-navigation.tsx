import { Button } from '@/components';
import { Checkout } from '@/types';
import { useRouter } from 'next/navigation';

interface CheckoutNavigationProps {
  checkout: Checkout;
  onOpenCheckout: () => void;
  isLoading?: boolean;
}

export default function CheckoutNavigation({
  checkout,
  isLoading,
  onOpenCheckout,
}: CheckoutNavigationProps) {
  const router = useRouter();
  return (
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
        onClick={onOpenCheckout}
        appendIcon="shoppingCart"
        disabled={checkout.items.length === 0}
        size="lg"
        loading={isLoading}
        className="min-w-3xs"
      />
    </div>
  );
}
