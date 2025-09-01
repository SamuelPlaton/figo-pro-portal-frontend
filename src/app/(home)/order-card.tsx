import { Order } from '@/types';
import { ProductListItem } from '@/components';
import { getDisplayDate } from '@/utils/date';

interface OrderCardProps {
  order: Order;
}
export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="rounded-md border border-neutral-lower">
      <div className="p-4 border-b border-neutral-lower flex flex-row gap-2 justify-between items-center text-sm text-neutral-low">
        <div className="flex flex-col gap-1">
          <span className="font-bold">N° de commande</span>
          <span>{order.reference_id}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold">Date de la commande</span>
          <span>{getDisplayDate(order.created_at)}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold">Total</span>
          <span>
            {order.product_orders.reduce((acc, item) => acc + (item.product?.price || 0), 0)} CF
          </span>
        </div>
      </div>
      <div>
        {order.product_orders.map((item, key) => (
          <div className="p-4" key={key}>
            <ProductListItem product={item.product} />
          </div>
        ))}
      </div>
    </div>
  );
}
