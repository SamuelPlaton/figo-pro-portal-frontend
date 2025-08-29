import { Checkout, Order, Product } from '@/types';
import { Icon } from '@/components';

interface CheckoutTotalPriceProps {
  checkout?: Checkout;
  order?: Order;
  products?: Product[];
}
export default function CheckoutTotalPrice({ checkout, order, products }: CheckoutTotalPriceProps) {
  const getTotalPrice = () => {
    if (checkout && products) {
      return checkout.items.reduce(
        (acc, item) => acc + (products.find(p => p.id === item.id)?.price ?? 0),
        0,
      );
    } else if (order) {
      return order.products.reduce((acc, item) => acc + (item.price ?? 0), 0);
    }
  };

  return (
    <div className="flex flex-row gap-1">
      <Icon name="figoCoin" />
      <span>{getTotalPrice()}</span>
    </div>
  );
}
