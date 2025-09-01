import { Checkout, Order, Product } from '@/types';
import { Icon } from '@/components';

interface OrderTotalPriceProps {
  checkout?: Checkout;
  order?: Order;
  products?: Product[];
}

export default function OrderTotalPrice({ checkout, order, products }: OrderTotalPriceProps) {
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
    <div className="flex flex-row items-center gap-1">
      <Icon name="figoCoin" />
      <span>{getTotalPrice()}</span>
    </div>
  );
}
