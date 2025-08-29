import { Checkout, CloudPrinterOrder, Product } from '@/types';
import { Icon } from '@/components';

interface CheckoutTotalPriceProps {
  checkout?: Checkout;
  order?: CloudPrinterOrder;
  products: Product[];
}
export default function CheckoutTotalPrice({ checkout, order, products }: CheckoutTotalPriceProps) {
  const getTotalPrice = () => {
    if (checkout) {
      return checkout.items.reduce(
        (acc, item) => acc + (products.find(p => p.id === item.id)?.price ?? 0),
        0,
      );
    } else if (order) {
      return order.items.reduce(
        (acc, item) =>
          acc + (products.find(p => p.external_reference === item.reference)?.price ?? 0),
        0,
      );
    }
  };

  return (
    <div className="flex flex-row gap-1">
      <Icon name="figoCoin" />
      <span>{getTotalPrice()}</span>
    </div>
  );
}
