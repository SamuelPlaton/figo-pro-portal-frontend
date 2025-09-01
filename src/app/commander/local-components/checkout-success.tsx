import { Order } from '@/types';
import { OrderTotalPrice, ProductListItem } from '@/components';

interface CheckoutSuccessProps {
  order: Order;
}

export default function CheckoutSuccess({ order }: CheckoutSuccessProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-lg font-bold">Merci pour votre commande !</span>
      <span className="text-neutral-low mb-4">
        Vos supports de communication vont être préparés et expédiés prochainement
      </span>
      <div className="flex flex-row gap-1 pb-4">
        <span className="text-neutral-low">Numéro de commande :</span>
        <span className="font-bold text-primary">{order.reference_id}</span>
      </div>
      <div className="mb-4">
        {order.product_orders.map((item, key) => (
          <ProductListItem
            key={key}
            product={item.product}
            className="py-4 border-y border-neutral-lower"
          />
        ))}
      </div>
      <div className="font-bold flex flex-row justify-between gap-2 mb-6">
        <span>Sous total</span>
        <OrderTotalPrice order={order} />
      </div>
      <div className="flex flex-col text-neutral-low">
        <span className="font-bold mb-2 text-black">Informations de livraison</span>
        <span>
          {order.address.first_name} {order.address.last_name}
        </span>
        <span>{order.address.company}</span>
        <span>{order.address.street1}</span>
        <span>
          {order.address.zip}, {order.address.city}
        </span>
      </div>
    </div>
  );
}
